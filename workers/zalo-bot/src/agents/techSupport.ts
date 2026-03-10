import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { createTelegramTool } from "../tools";
import { SystemMessage } from "@langchain/core/messages";

export function createTechSupportAgent(model: ChatCloudflareWorkersAI, telegramBotToken: string, adminChatId: string) {
    const tools = [createTelegramTool(telegramBotToken, adminChatId)];

    return createReactAgent({
        llm: model,
        tools,
        stateModifier: new SystemMessage(
            "You are the Tech Support Agent for VinaUAV.\n" +
            "Your job is to answer technical questions about drones and flight controllers.\n" +
            "If the question is too complex or requires human intervention, use the telegram tool to notify an admin."
        )
    });
}
