import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { D1Orm } from "../services/db";

export const createPaymentTool = (db: D1Database, bankAcc: string, bankName: string) => {
    const orm = new D1Orm(db);

    const generatePaymentQRTool = tool(
        async ({ chatId, amount }) => {
            const orderId = crypto.randomUUID();
            const memo = `VNAFC_${orderId.replace(/-/g, '').substring(0, 10).toUpperCase()}`;

            await orm.createPaymentOrder(orderId, chatId, amount, memo);

            // Construct SePay URL
            const qrUrl = `https://qr.sepay.vn/img?acc=${bankAcc}&bank=${bankName}&amount=${amount}&des=${memo}`;

            return `Payment order created. Order ID: ${orderId}\n` +
                `Please provide this QR URL to the customer for payment: ${qrUrl}\n` +
                `The transfer memo MUST BE EXACTLY: ${memo}`;
        },
        {
            name: "generate_payment_qr",
            description: "Generates a SePay QR code for payment, creating a pending order in the database.",
            schema: z.object({
                chatId: z.string().describe("The chat ID or user ID placing the payment order."),
                amount: z.number().describe("The exact amount the user has to pay in VND.")
            })
        }
    );

    return [generatePaymentQRTool];
};
