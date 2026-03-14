import { maxTextLength } from "..";
import type { WebhookMessage, ChatContext, ChatMessage } from "../types";
import { sendMessage } from "../zalo";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { createSupervisorAgent } from "../agents/supervisor";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const KV_TTL_SECONDS = 1800; // 30 minutes
const MAX_CONTEXT_MESSAGES = 10;

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
// Multi-Agent Graph Helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Invokes the LangGraph multi-agent supervisor graph and returns the
 * final AI response string.
 */
async function runMultiAgentGraph(
    env: Env,
    contextMessages: ChatMessage[],
    userText: string,
    threadId: string
): Promise<string> {
    // 1. Initialise the LLM model binding.
    const model = new ChatCloudflareWorkersAI({
        model: "@hf/thebloke/neural-chat-7b-v3-1-awq",
        ai: env.AI,
    } as any);

    // 2. Compile the Supervisor → Worker state graph.
    const graph = createSupervisorAgent(env, model);

    // 3. Reconstruct LangChain message history from KV context.
    const langchainMessages = contextMessages.map((m) =>
        m.role === "user"
            ? new HumanMessage(m.content)
            : new AIMessage(m.content)
    );
    langchainMessages.push(new HumanMessage(userText));

    // 4. Invoke the autonomous agentic loop.
    const result = await graph.invoke(
        { messages: langchainMessages },
        { configurable: { thread_id: threadId } }
    );

    // 5. Extract the final message from the graph output.
    const outMessages = result.messages;
    const finalMsg = outMessages[outMessages.length - 1];

    return typeof finalMsg.content === "string"
        ? finalMsg.content
        : JSON.stringify(finalMsg.content);
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

    // 5. Invoke the LangGraph multi-agent supervisor graph.
    const aiReply = await runMultiAgentGraph(env, context.messages, userText, chatId);
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
