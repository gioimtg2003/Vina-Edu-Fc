import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { createTelegramTool, createRagTool } from "../tools";
import { SystemMessage } from "@langchain/core/messages";

export function createTechSupportAgent(model: ChatCloudflareWorkersAI, env: Env) {
    const tools = [
        createRagTool(env.AI, env.VECTOR_INDEX),
        createTelegramTool(env.TELEGRAM_BOT_TOKEN, env.ADMIN_CHAT_ID),
    ];

    return createReactAgent({
        llm: model,
        tools,
        stateModifier: new SystemMessage(
            "Bạn là trợ lý hỗ trợ kỹ thuật của hệ thống VinaUAV.\n" +
            "Bạn có thể trả lời các câu hỏi về drone và flight controller.\n\n" +
            "QUY TẮC BẮT BUỘC:\n" +
            "1. Với MỌI câu hỏi liên quan đến phần cứng (hardware), firmware, PID, ESC, motor, cảm biến, " +
            "hoặc cấu hình flight controller — bạn PHẢI gọi tool `search_technical_docs` TRƯỚC khi trả lời.\n" +
            "2. Dùng kết quả từ tài liệu kỹ thuật để đưa ra câu trả lời chính xác và có căn cứ.\n" +
            "3. Nếu tài liệu không đủ thông tin, hãy bổ sung từ kiến thức chung nhưng phải nói rõ phần nào là từ tài liệu.\n" +
            "4. Nếu câu hỏi quá phức tạp hoặc yêu cầu sự tham gia trực tiếp của con người, hãy sử dụng tool " +
            "`send_telegram_notification` để thông báo cho admin."
        ),
    });
}
