import { EMBEEDING_MODEL, maxTextLength } from "..";
import { ChatContext, ChatMessage, WebhookMessage } from "../types";
import { sendMessage } from "../zalo";

const KV_TTL_SECONDS = 1800; // 30 minutes
const MAX_CONTEXT_MESSAGES = 10;

const SYSTEM_PROMPT = `Role: Bạn là chuyên gia hỗ trợ kỹ thuật AI của hệ sinh thái VinaUAV (chuyên cung cấp mạch bay Drone và đào tạo UAV tại Việt Nam).

- Objective: Giải đáp thắc mắc và hỗ trợ kỹ thuật dựa trên dữ liệu được cung cấp.

- Constraint Checklist (Bắt buộc tuân thủ):

Ngôn ngữ: CHỈ sử dụng tiếng Việt. Tuyệt đối không trả lời bằng tiếng Anh hoặc bất kỳ ngôn ngữ nào khác dưới mọi hình thức.

Phạm vi thông tin: Chỉ sử dụng thông tin trong ngữ cảnh (Context) được cung cấp.

Xử lý ngoài phạm vi: Nếu câu hỏi không có trong Context hoặc không liên quan đến VinaUAV/Drone, trả lời chính xác và duy nhất câu: "Xin lỗi, tôi không hỗ trợ vấn đề này."

Phong cách: Ngắn gọn, súc tích, đi thẳng vào vấn đề. Không giải thích tại sao không trả lời được, không chào hỏi rườm rà ở cuối câu.

- Output Format:

Nội dung trả lời trực tiếp.

Không thêm các câu dẫn như "Dựa vào thông tin trên..." hay "Theo tôi biết...".`;

// ─────────────────────────────────────────────────────────────────────────────
// KV Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function loadContext(kv: KVNamespace, chatId: string): Promise<ChatContext> {
    const stored = await kv.get<ChatContext>(chatId, "json");
    if (stored) return stored;

    return {
        chatId,
        messages: [],
        lastUpdated: Date.now(),
    };
}

async function saveContext(kv: KVNamespace, context: ChatContext): Promise<void> {
    await kv.put(context.chatId, JSON.stringify(context), {
        expirationTtl: KV_TTL_SECONDS,
    });
}

// Keeps only the last N messages using a sliding window.
function applyWindowLimit(messages: ChatMessage[], limit: number): ChatMessage[] {
    return messages.length > limit ? messages.slice(messages.length - limit) : messages;
}

export async function _handleTextMessage(
    message: WebhookMessage,
    env: Env
): Promise<void> {
    const chatId = message.chat.id;
    const userText = message.text ?? "(empty)";

    console.log(`[textMessage] chatId=${chatId} text="${userText}"`);

    // 1. Load existing context from KV.
    const context = await loadContext(env.CHAT_CONTEXT, chatId);

    // 2. Append the new user turn.
    context.messages.push({ role: "user", content: userText });

    // 3. Apply sliding window before calling AI to avoid token overflow.
    context.messages = applyWindowLimit(context.messages, MAX_CONTEXT_MESSAGES);
    context.lastUpdated = Date.now();

    // 4. Persist user turn immediately (fail-safe: AI may error, context is saved).
    await saveContext(env.CHAT_CONTEXT, context);

    // 5. Embed the user query and search the Vectorize Index for RAG context.
    const embeddingResp = await env.AI.run(EMBEEDING_MODEL, { text: [userText] });
    const vectorQuery = await env.VECTOR_INDEX.query(embeddingResp?.data?.[0], {
        topK: 3,
        returnMetadata: true
    });

    const ragContext = vectorQuery.matches
        .filter(match => match.metadata && match.metadata.text)
        .map(match => match.metadata!.text)
        .join("\n\n");

    const enhancedSystemPrompt = `${SYSTEM_PROMPT}\n\nThông tin tham khảo (Context):\n${ragContext}`;

    // 5b. Invoke AI with the RAG system prompt.
    const messagesForAI = [
        { role: "system" as const, content: enhancedSystemPrompt },
        ...context.messages
    ];

    const aiResp = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        messages: messagesForAI
    });

    const aiReply = (aiResp as any).response || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.";

    console.log(`[textMessage] Agent reply for chatId=${chatId}: "${aiReply}"`);

    // 6. Append the assistant reply and apply sliding window again.
    context.messages.push({ role: "assistant", content: aiReply });
    context.messages = applyWindowLimit(context.messages, MAX_CONTEXT_MESSAGES);
    context.lastUpdated = Date.now();

    // 7. Persist final context.
    await saveContext(env.CHAT_CONTEXT, context);

    // 8. Send the response to the user via Zalo, chunking if necessary.
    let remainingText = aiReply;

    while (remainingText.length > 0) {
        let chunk = "";

        if (remainingText.length > 2000) {
            let cutAt = remainingText.lastIndexOf('\n', maxTextLength);

            if (cutAt < maxTextLength / 2) {
                cutAt = maxTextLength;
            } else {
                cutAt = cutAt + 1;
            }

            chunk = remainingText.slice(0, cutAt);
            remainingText = remainingText.slice(cutAt);
        } else {
            chunk = remainingText;
            remainingText = "";
        }

        await sendMessage(env.ZALO_BOT_TOKEN, {
            chat_id: chatId,
            text: chunk,
        });

        if (remainingText.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
}
