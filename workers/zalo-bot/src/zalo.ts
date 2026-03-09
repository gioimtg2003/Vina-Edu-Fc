import { ZaloApiResponse, ZaloMessage, ZaloSendChatActionParams, ZaloSendMessageParams } from "./types";

const ZALO_API_BASE = "https://bot-api.zaloplatforms.com";

export type ZaloFetch = (input: string, init?: RequestInit) => Promise<Response>;


export async function callZaloApi<T = unknown>(
    method: string,
    token: string,
    body?: Record<string, unknown>,
    options?: { timeoutMs?: number; fetch?: ZaloFetch },
): Promise<ZaloApiResponse<T>> {
    const url = `${ZALO_API_BASE}/bot${token}/${method}`;
    const controller = new AbortController();
    const timeoutId = options?.timeoutMs
        ? setTimeout(() => controller.abort(), options.timeoutMs)
        : undefined;
    const fetcher = options?.fetch ?? fetch;

    try {
        const response = await fetcher(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        const data = (await response.json()) as ZaloApiResponse<T>;

        if (!data.ok) {
            throw new Error(data.description ?? `Zalo API error: ${method}`);
        }

        return data;
    } finally {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }
}

export async function sendMessage(
    token: string,
    params: ZaloSendMessageParams,
    fetcher?: ZaloFetch,
): Promise<ZaloApiResponse<ZaloMessage>> {
    return callZaloApi<ZaloMessage>("sendMessage", token, params, { fetch: fetcher });
}


export async function sendChatAction(
    token: string,
    params: ZaloSendChatActionParams,
    fetcher?: ZaloFetch,
    timeoutMs?: number,
): Promise<ZaloApiResponse<boolean>> {
    return callZaloApi<boolean>("sendChatAction", token, params, {
        timeoutMs,
        fetch: fetcher,
    });
}