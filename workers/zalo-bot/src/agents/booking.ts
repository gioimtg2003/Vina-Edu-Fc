import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { createGoogleCalendarTools } from "../tools";
import { SystemMessage } from "@langchain/core/messages";

export function createBookingAgent(
    model: ChatCloudflareWorkersAI,
    clientEmail: string,
    privateKey: string,
    calendarId: string
) {
    const tools = createGoogleCalendarTools(clientEmail, privateKey, calendarId);

    return createReactAgent({
        llm: model,
        tools,
        stateModifier: new SystemMessage(
            "You are the Booking Agent for VinaUAV.\n" +
            "Your job is to check calendar availability and book consultation appointments for customers.\n" +
            "Ensure you have the customer's name, preferred datetime, and topic before booking."
        )
    });
}
