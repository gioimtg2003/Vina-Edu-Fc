import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { D1Orm } from "../services/db";

export const createInventoryTools = (db: D1Database) => {
    const orm = new D1Orm(db);

    const checkInventoryTool = tool(
        async ({ productName }) => {
            const item = await orm.getInventoryItem(productName);
            if (!item) return `Hàng hoá ${productName} không tồn tại trong kho.`;
            return `Hàng hoá ${item.name}: Số lượng = ${item.stock}, Giá = $${item.price}. Mô tả: ${item.description}`;
        },
        {
            name: "check_inventory",
            description: "Kiểm tra số lượng hàng hoá và giá hàng hoá.",
            schema: z.object({
                productName: z.string().describe("Tên sản phẩm.")
            })
        }
    );

    const placeOrderTool = tool(
        async ({ userId, productName, quantity }) => {
            const item = await orm.getInventoryItem(productName);
            if (!item) return `Hàng hoá ${productName} không tồn tại trong kho. Không thể đặt hàng.`;
            if (item.stock < quantity) {
                return `Số lượng hàng hoá ${item.name} trong kho chỉ còn ${item.stock}. Không thể đặt hàng.`;
            }

            const orderId = await orm.createOrder(userId, item.id, quantity);
            return `Đặt hàng thành công ${quantity}x ${item.name}. Order ID là ${orderId}. Tổng tiền là $${item.price * quantity}.`;
        },
        {
            name: "place_order",
            description: "Đặt hàng cho khách hàng và ghi nhận vào database.",
            schema: z.object({
                userId: z.string().describe("ID của khách hàng đặt hàng."),
                productName: z.string().describe("Tên sản phẩm.",),
                quantity: z.number().describe("Số lượng sản phẩm.")
            })
        }
    );

    return [checkInventoryTool, placeOrderTool];
};
