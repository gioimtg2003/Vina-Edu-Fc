import { maxTextLength } from "..";
import type { WebhookMessage, ChatMessage, ChatContext } from "../types";
import { sendMessage } from "../zalo";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const KV_TTL_SECONDS = 1800; // 30 minutes
const MAX_CONTEXT_MESSAGES = 10;
const AI_MODEL = "@cf/meta/llama-3-8b-instruct" as const;
const SYSTEM_PROMPT =
    "Bạn là trợ lý ảo của Giới Đzai. Hãy trả lời lại những câu vui đùa ngắn gọn, hài hước, thân thiện và bằng tiếng Việt và hậu tố thường có ':))'. Lưu ý: bạn chỉ trả lời hài hước theo phong cách miền Nam của Việt Nam";

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

// ─────────────────────────────────────────────────────────────────────────────
// AI Helper
// ─────────────────────────────────────────────────────────────────────────────

async function runAI(
    ai: Ai,
    messages: ChatMessage[]
): Promise<string> {
    const prompt: RoleScopedChatInput[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const response = await ai.run(AI_MODEL, { messages: prompt });

    // Workers AI returns { response: string } for chat models.
    if (typeof response === "object" && response !== null && "response" in response) {
        return String((response as { response: string }).response).trim();
    }

    throw new Error("Unexpected AI response shape");
}

// ─────────────────────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────────────────────

export async function handleTextMessage(
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

    // 5. Call Cloudflare Workers AI.
    const aiReply = await runAI(env.AI, context.messages);
    console.log(`[textMessage] AI reply for chatId=${chatId}: "${aiReply}"`);

    // 6. Append the assistant reply and apply sliding window again.
    context.messages.push({ role: "assistant", content: aiReply });
    context.messages = applyWindowLimit(context.messages, MAX_CONTEXT_MESSAGES);
    context.lastUpdated = Date.now();

    // 7. Persist final context.
    await saveContext(env.CHAT_CONTEXT, context);

    let remainingText = aiReply;

    while (remainingText.length > 0) {
        let chunk = "";

        if (remainingText.length > maxTextLength) {
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
