import { Hono } from 'hono';
import { ChatCloudflareWorkersAI } from '@langchain/cloudflare';
import { createSupervisorAgent } from './agents/supervisor';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { sendMessage } from './zalo';

const app = new Hono<{ Bindings: Env & any }>();

app.get('/', (c) => {
	return c.text('VinaUAV Multi-Agent Bot Architecture is Active!');
});

app.post('/webhook', async (c) => {
	const body = await c.req.json();
	const userId = body.userId || body.message?.chat?.id || "default_user";
	const userMessage = body.text || body.message?.text || "";

	if (!userMessage) return c.json({ error: "No message found" }, 400);

	// Initialize Workers AI Model
	const model = new ChatCloudflareWorkersAI({
		model: "@hf/thebloke/neural-chat-7b-v3-1-awq", // Standard CF Workers AI model, can adjust
		ai: c.env.AI
	} as any);

	// Compile our Multi-Agent state graph
	const graph = createSupervisorAgent(c.env, model);

	// Retrieve thread state from KV
	const threadKey = `thread:${userId}`;
	const storedState = await c.env.CHAT_CONTEXT.get(threadKey, "json") as any[] || [];

	// Reconstruct conversation history
	const messages = storedState.map(msg =>
		msg.type === 'human' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
	);
	messages.push(new HumanMessage(userMessage));

	// Invoke the autonomous LangGraph agentic loop
	const result = await graph.invoke(
		{ messages },
		{ configurable: { thread_id: userId } }
	);

	const outMessages = result.messages;
	const finalMsg = outMessages[outMessages.length - 1];

	// Persist thread state back to KV (keep context window small by retaining last 10 messages)
	const messagesToSave = outMessages.map((m: any) => ({
		type: m._getType(),
		content: m.content
	})).slice(-10);

	await c.env.CHAT_CONTEXT.put(threadKey, JSON.stringify(messagesToSave));

	return c.json({
		response: finalMsg.content,
		threadId: userId
	});
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

			});

			console.log("Sent Zalo payment success notification to", chatId);
		} catch (e) {
			console.error("Failed to send Zalo notification:", e);
		}
	}

	return c.json({ success: true });
});

export default app;
