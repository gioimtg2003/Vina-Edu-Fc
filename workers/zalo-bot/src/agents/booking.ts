import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { createGoogleCalendarTools } from "../tools";
import { SystemMessage } from "@langchain/core/messages";
import { ChatGoogle } from "@langchain/google/node";

export function createBookingAgent(
    model: ChatGoogle,
    clientEmail: string,
    privateKey: string,
    calendarId: string
) {
    const tools = createGoogleCalendarTools(clientEmail, privateKey, calendarId);

    return createReactAgent({
        llm: model,
        tools,
        stateModifier: new SystemMessage(
            "Bạn là trợ lý đặt lịch cho hệ thống VinaUAV.\n" +
            "Bạn có thể kiểm tra lịch và đặt lịch cho khách hàng.\n" +
            "Đảm bảo bạn có tên khách hàng, thời gian và chủ đề trước khi đặt lịch."
        )
    });
}
