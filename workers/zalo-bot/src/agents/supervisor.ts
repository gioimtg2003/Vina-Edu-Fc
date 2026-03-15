import { StateGraph, START, END, MemorySaver, Annotation } from "@langchain/langgraph";
import { BaseMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogle } from "@langchain/google";
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

export async function createSupervisorAgent(env: Env) {
    const model = new ChatGoogle({model: 'gemini-flash-lite-latest', apiKey: 'AIzaSyDBfcbWbWLNUZkBsSA14lxBcX2mCubxtM4', temperature: 0,
        maxRetries: 2, });

    const aiMsg = await model.invoke([
        [
            "system",
            "You are a helpful assistant that translates English to French. Translate the user sentence.",
        ],
        ["human", "I love programming."],
    ])
    console.log(aiMsg)
    const commerceAgent = createCommerceAgent(model, env.DB, env.SEPAY_BANK_ACC || "", env.SEPAY_BANK_NAME || "");
    const bookingAgent = createBookingAgent(model, env.GOOGLE_CLIENT_EMAIL || "", env.GOOGLE_PRIVATE_KEY || "", env.GOOGLE_CALENDAR_ID || "");
    const techSupportAgent = createTechSupportAgent(model, env);

    const members = ["Commerce", "Booking", "TechSupport"] as const;

    const
        supervisorNode = async (state: typeof AgentState.State, _: any) => {
            const sysMsg = new SystemMessage(
                "Bạn là một người giám sát quản lý cuộc trò chuyện giữa người dùng và các worker sau: " +
                members.join(", ") + ". Dựa vào yêu cầu của người dùng, hãy chọn worker để tiếp tục. " +
                "Nếu yêu cầu đã được giải quyết hoặc bạn muốn trả lời người dùng, hãy trả lời với FINISH."
            );

            const routeTool = tool(
                async ({ next }) => { return `Routing to ${next}`; },
                {
                    name: "route",
                    description: "Chọn worker tiếp theo để tiếp tục.",
                    schema: z.object({
                        next: z.enum(["Commerce", "Booking", "TechSupport", "FINISH"]).describe("Worker tiếp theo, hoặc FINISH nếu đã giải quyết.")
                    })
                }
            );

          const supervisorModel = model?.bindTools?.([routeTool], { tool_choice: "route" });
            const response = await supervisorModel?.invoke([sysMsg, ...state.messages]);
            console.log(model?.bindTools)
            const toolCall = response?.tool_calls?.[0];
            let next = "FINISH";
            if (toolCall?.args?.next) {
                next = toolCall.args.next;
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
