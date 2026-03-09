import type { WebhookMessage } from "../types";

export async function handleStickerMessage(
    message: WebhookMessage,
    _env: Env
): Promise<void> {
    const chatId = message.chat.id;
    const attachments = message.attachments ?? [];

    console.log(
        `[stickerMessage] chatId=${chatId} received sticker. file_id=${attachments[0]?.file_id ?? "n/a"}`
    );

    // ---------------------------------------------------------------------------
    // TODO: React to the sticker — e.g., reply with an emoji or a fun response.
    //
    // Example:
    //   await sendMessage(chatId, "😄 Nice sticker!", env);
    // ---------------------------------------------------------------------------
}
