import type { WebhookResult } from "./types";
import { routeEvent } from "./router";

export const maxTextLength = 2000;
function jsonResponse(body: unknown, status: number): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

/**
 * Validates the X-Bot-Api-Secret-Token header against the SECRET_TOKEN
 * environment variable using a timing-safe comparison.
 */
function isAuthorized(request: Request, secretToken: string): boolean {
	const header = request.headers.get("X-Bot-Api-Secret-Token");
	if (!header) return false;

	// Timing-safe comparison to prevent timing attacks.
	if (header.length !== secretToken.length) return false;

	let result = 0;
	for (let i = 0; i < header.length; i++) {
		result |= header.charCodeAt(i) ^ secretToken.charCodeAt(i);
	}
	return result === 0;
}



export default {
	async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
		if (request.method !== "POST") {
			return jsonResponse({ error: "Method Not Allowed" }, 405);
		}

		const contentType = request.headers.get("Content-Type") ?? "";
		if (!contentType.includes("application/json")) {
			return jsonResponse({ error: "Unsupported Media Type — use application/json" }, 415);
		}
		if (!isAuthorized(request, "VinaUAV123")) {
			console.warn("[auth] Unauthorized request from", request.headers.get("CF-Connecting-IP"));
			return jsonResponse({ error: "Unauthorized" }, 401);
		}

		let payload: WebhookResult = await request.json();

		if (!Object.keys(payload ?? {}).includes("event_name")) {
			console.warn("[router] Received payload with ok=false, skipping.");
			return jsonResponse({ ok: true, message: "Skipped non-ok payload" }, 200);
		}

		try {

			await routeEvent(payload, env);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Internal error";
			console.error("[handler]", message, err);
			return jsonResponse({ ok: false, error: message }, 200);
		}

		return jsonResponse({ ok: true }, 200);
	},
} satisfies ExportedHandler<Env>;
