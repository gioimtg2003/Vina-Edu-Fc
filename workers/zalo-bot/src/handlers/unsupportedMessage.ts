import type { WebhookMessage } from "../types";

export async function handleUnsupportedMessage(
    message: WebhookMessage,
    _env: Env
): Promise<void> {
    const chatId = message.chat.id;

    console.log(`[unsupportedMessage] chatId=${chatId} received an unsupported message type.`);

    // ---------------------------------------------------------------------------
    // TODO: Optionally notify the user that the message type is not yet supported.
    //
    // Example:
    //   await sendMessage(chatId, "Sorry, I can only handle text and images right now.", env);
    // ---------------------------------------------------------------------------
}
