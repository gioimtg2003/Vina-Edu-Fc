import type { WebhookMessage } from "../types";

export async function handleImageMessage(
    message: WebhookMessage,
    _env: Env
): Promise<void> {
    const chatId = message.chat.id;
    const attachments = message.attachments ?? [];

    console.log(
        `[imageMessage] chatId=${chatId} received ${attachments.length} image attachment(s).`
    );

    // ---------------------------------------------------------------------------
    // TODO: Process the image — e.g., run image-to-text, store metadata in KV,
    // or forward to a vision AI model.
    //
    // Example:
    //   for (const attachment of attachments) {
    //     const caption = await runVisionAI(env.AI, attachment.url);
    //     await sendMessage(chatId, caption, env);
    //   }
    // ---------------------------------------------------------------------------
}
