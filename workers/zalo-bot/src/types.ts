
export interface WebhookSender {
    id: string;
    display_name: string;
    is_bot: boolean;
}

export interface WebhookChat {
    id: string;
    chat_type: "PRIVATE" | "GROUP" | "CHANNEL";
}

export interface WebhookMessage {
    from: WebhookSender;
    chat: WebhookChat;
    text?: string;
    message_id: string;
    date: number;
    /** Present on image/sticker messages; absent on text. */
    attachments?: WebhookAttachment[];
}

export interface WebhookAttachment {
    type: "IMAGE" | "STICKER" | "FILE";
    url?: string;
    file_id?: string;
}

export type EventName =
    | "message.text.received"
    | "message.image.received"
    | "message.sticker.received"
    | "message.unsupported.received";

export interface WebhookResult {
    message: WebhookMessage;
    event_name: EventName;
}

export interface WebhookPayload {
    ok: boolean;
    result: WebhookResult;
}

// ─────────────────────────────────────────────────────────────────────────────
// KV Context Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export type AiRole = "user" | "assistant" | "system";

export interface ChatMessage {
    role: AiRole;
    content: string;
}

/** Shape of the value stored per chat in KV. */
export interface ChatContext {
    chatId: string;
    messages: ChatMessage[];
    lastUpdated: number;
}


export type ZaloApiResponse<T = unknown> = {
    ok: boolean;
    result?: T;
    error_code?: number;
    description?: string;
};

export type ZaloBotInfo = {
    id: string;
    name: string;
    avatar?: string;
};

export type ZaloMessage = {
    message_id: string;
    from: {
        id: string;
        name?: string;
        avatar?: string;
    };
    chat: {
        id: string;
        chat_type: "PRIVATE" | "GROUP";
    };
    date: number;
    text?: string;
    photo?: string;
    caption?: string;
    sticker?: string;
};

export type ZaloUpdate = {
    event_name: EventName;
    message?: ZaloMessage;
};

export type ZaloSendMessageParams = {
    chat_id: string;
    text: string;
};

export type ZaloSendPhotoParams = {
    chat_id: string;
    photo: string;
    caption?: string;
};

export type ZaloSendChatActionParams = {
    chat_id: string;
    action: "typing" | "upload_photo";
};

export type ZaloSetWebhookParams = {
    url: string;
    secret_token: string;
};

export type ZaloWebhookInfo = {
    url?: string;
    updated_at?: number;
    has_custom_certificate?: boolean;
};

export type ZaloGetUpdatesParams = {
    /** Timeout in seconds (passed as string to API) */
    timeout?: number;
};