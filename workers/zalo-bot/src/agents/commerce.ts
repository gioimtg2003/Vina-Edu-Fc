import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { createInventoryTools } from "../tools";
import { createPaymentTool } from "../tools/paymentTool";
import { SystemMessage } from "@langchain/core/messages";

export function createCommerceAgent(model: ChatCloudflareWorkersAI, db: D1Database, bankAcc: string, bankName: string) {
    const tools = [
        ...createInventoryTools(db),
        ...createPaymentTool(db, bankAcc, bankName)
    ];

    return createReactAgent({
        llm: model,
        tools,
        stateModifier: new SystemMessage(
            "You are the Commerce Agent for VinaUAV.\n" +
            "Your job is to check product inventory, prices, and place orders for customers.\n" +
            "Always verify stock before confirming an order."
        )
    });
}
