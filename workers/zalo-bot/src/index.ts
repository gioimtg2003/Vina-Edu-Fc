
import { Hono } from 'hono';
import { routeEvent } from './router';
import { sendMessage } from './zalo';
import type { WebhookResult } from './types';

export const maxTextLength = 2000;
export const EMBEEDING_MODEL = "@cf/baai/bge-m3";

const app = new Hono<{ Bindings: Env }>();

function isAuthorized(request: Request, secretToken: string): boolean {
	const header = request.header("X-Bot-Api-Secret-Token");
	if (!header) return false;

	// Timing-safe comparison to prevent timing attacks.
	if (header.length !== secretToken.length) return false;

	let result = 0;
	for (let i = 0; i < header.length; i++) {
		result |= header.charCodeAt(i) ^ secretToken.charCodeAt(i);
	}
	return result === 0;
}


app.get('/', (c) => {
	return c.text('VinaUAV Multi-Agent Bot Architecture is Active!');
});

app.post('/webhook', async (c) => {

	if (!isAuthorized(c.req, "VinaUAV123")) {
		console.warn("[auth] Unauthorized request from", c.req.header("CF-Connecting-IP"));
		return c.json({ error: "Unauthorized" }, 401);
	}

	const body = await c.req.json() as WebhookResult;

	if (!body.event_name) {
		console.warn("[router] Missing event_name in payload, skipping.");
		return c.json({ ok: true, message: "Skipped: no event_name" }, 200);
	}

	console.log(`[webhook] Received event: ${body.event_name} from chatId=${body.message?.chat?.id ?? "unknown"}`);
	try {
		await routeEvent(body, c.env);
	} catch (err) {
		console.error("[webhook] Error processing event:", err);
		return c.json({ ok: false, error: "Internal processing error" }, 500);
	}

	return c.json({ ok: true });
});

app.post('/payment', async (c) => {

	const reqApiKey = c.req.header('Authorization') || "";
	if (reqApiKey !== `Bearer ${c.env.SEPAY_API_KEY}`) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const body = await c.req.json();
	const content = body.transaction_content || body.content || "";
	const amount = body.transferAmount || body.amount || 0;

	const match = content.match(/VNAFC_[A-Z0-9]+/);
	if (!match) {
		return c.json({ message: "No matching memo found in transaction content", ok: true });
	}

	const memo = match[0];

	const orm = new (await import('./services/db')).D1Orm(c.env.DB);
	const chatId = await orm.completeOrderStatus(memo, amount);

	if (chatId) {


		try {
			await sendMessage(c.env.ZALO_BOT_TOKEN, {
				chat_id: chatId,
				text: `Thanh toán thành công! VinaUAV cảm ơn bạn đã ủng hộ. \nĐơn hàng: ${memo} \nSố tiền: ${amount} VNĐ`
			});

			console.log("Sent Zalo payment success notification to", chatId);
		} catch (e) {
			console.error("Failed to send Zalo notification:", e);
		}
	}

	return c.json({ success: true });
});

export default app;
