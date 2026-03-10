import { StateGraph, START, END, MemorySaver, Annotation } from "@langchain/langgraph";
import { BaseMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { z } from "zod";
import { tool } from "@langchain/core/tools";

import { createCommerceAgent } from "./commerce";
import { createBookingAgent } from "./booking";
import { createTechSupportAgent } from "./techSupport";

export const AgentState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
        default: () => [],
    }),
    next: Annotation<string>({
        reducer: (x, y) => y ?? x,
        default: () => "Supervisor",
    })
});

export function createSupervisorAgent(env: Env, model: ChatCloudflareWorkersAI) {
    const commerceAgent = createCommerceAgent(model, env.DB, env.SEPAY_BANK_ACC || "", env.SEPAY_BANK_NAME || "");
    const bookingAgent = createBookingAgent(model, env.GOOGLE_CLIENT_EMAIL || "", env.GOOGLE_PRIVATE_KEY || "", env.GOOGLE_CALENDAR_ID || "");
    const techSupportAgent = createTechSupportAgent(model, env.TELEGRAM_BOT_TOKEN || "", env.ADMIN_CHAT_ID || "");

    const members = ["Commerce", "Booking", "TechSupport"] as const;

    const
        supervisorNode = async (state: typeof AgentState.State, _: any) => {
            const sysMsg = new SystemMessage(
                "You are a supervisor managing a conversation between the user and the following workers: " +
                members.join(", ") + ". Given the following user request, respond with the worker to act next. " +
                "If the request has been fully resolved or you want to respond to the user, respond with FINISH."
            );

            const routeTool = tool(
                async ({ next }) => { return `Routing to ${next}`; },
                {
                    name: "route",
                    description: "Select the next worker to route the user's request to.",
                    schema: z.object({
                        next: z.enum(["Commerce", "Booking", "TechSupport", "FINISH"]).describe("The next worker to route to, or FINISH if done.")
                    })
                }
            );

            const supervisorModel = (model as any).bindTools([routeTool], { tool_choice: "route" });
            const response = await supervisorModel.invoke([sysMsg, ...state.messages]);

            const toolCall = response.tool_calls?.[0];
            let next = "FINISH";
            if (toolCall?.args?.next) {
                next = toolCall.args.next; // will be Commerce, Booking, TechSupport, or FINISH
            }

            return { next };
        };

    const runAgent = (agent: any, name: string) => {
        return async (state: typeof AgentState.State, config: any) => {
            const result = await agent.invoke({ messages: state.messages }, config);
            const outputMsg = result.messages[result.messages.length - 1];
            return {
                messages: [new AIMessage({ content: outputMsg.content, name })]
            };
        };
    };

    const workflow = new StateGraph(AgentState)
        .addNode("Supervisor", supervisorNode)
        .addNode("Commerce", runAgent(commerceAgent, "Commerce"))
        .addNode("Booking", runAgent(bookingAgent, "Booking"))
        .addNode("TechSupport", runAgent(techSupportAgent, "TechSupport"))
        .addEdge(START, "Supervisor");

    for (const member of members) {
        workflow.addEdge(member, "Supervisor");
    }

    workflow.addConditionalEdges("Supervisor", (state) => state?.next, {
        Commerce: "Commerce",
        Booking: "Booking",
        TechSupport: "TechSupport",
        FINISH: END
    });

    const checkpointer = new MemorySaver();
    return workflow.compile({ checkpointer });
}
