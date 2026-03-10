import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const createTelegramTool = (botToken: string, overrideChatId?: string) => {
    return tool(
        async ({ message, chatId }) => {
            const targetChatId = overrideChatId || chatId;
            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: targetChatId,
                        text: message
                    })
                });

                if (!response.ok) {
                    const error = await response.text();
                    return `Failed to send telegram notification: ${error}`;
                }
                return "Notification sent successfully.";
            } catch (e: any) {
                return `Error sending telegram notification: ${e.message}`;
            }
        },
        {
            name: "send_telegram_notification",
            description: "Send a message to a user or admin via Telegram.",
            schema: z.object({
                message: z.string().describe("The text message to send."),
                chatId: z.string().describe("The target Telegram chat ID.")
            })
        }
    );
};
