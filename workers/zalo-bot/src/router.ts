import type { Env, WebhookResult, EventName } from "./types";
import { handleTextMessage } from "./handlers/textMessage";
import { handleImageMessage } from "./handlers/imageMessage";
import { handleStickerMessage } from "./handlers/stickerMessage";
import { handleUnsupportedMessage } from "./handlers/unsupportedMessage";
import { sendChatAction } from "./zalo";

/**
 * Routes an incoming webhook result to the appropriate event handler
 * based on the event_name field.
 */
export async function routeEvent(result: WebhookResult, env: Env): Promise<void> {
    const { message, event_name } = result;
    const event = event_name as EventName;
    await sendChatAction(env.ZALO_BOT_TOKEN, {
        chat_id: message.chat.id,
        action: "typing",
    })
    switch (event) {
        case "message.text.received":
            await handleTextMessage(message, env);
            break;

        case "message.image.received":
            await handleImageMessage(message, env);
            break;

        case "message.sticker.received":
            await handleStickerMessage(message, env);
            break;

        case "message.unsupported.received":
            await handleUnsupportedMessage(message, env);
            break;

        default: {
            // TypeScript exhaustiveness check — alerts us at compile-time if a new
            // EventName value is added to the union but not handled here.
            const _exhaustive: never = event;
            console.warn(`[router] Unhandled event_name received: ${String(_exhaustive)}`);
        }
    }
}
