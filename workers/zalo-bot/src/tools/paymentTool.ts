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

            return `Đơn hàng thanh toán đã được tạo. Order ID: ${orderId}\n` +
                `Vui lòng cung cấp QR URL này cho khách hàng thanh toán: ${qrUrl}\n` +
                `Mã giao dịch phải EXACTLY: ${memo}`;
        },
        {
            name: "generate_payment_qr",
            description: "Tạo QR code để khách hàng thanh toán, tạo đơn hàng trong database.",
            schema: z.object({
                chatId: z.string().describe("ID của khách hàng đặt hàng."),
                amount: z.number().describe("Số tiền khách hàng phải trả.")
            })
        }
    );

    return [generatePaymentQRTool];
};
