import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { D1Orm } from "../services/db";

export const createInventoryTools = (db: D1Database) => {
    const orm = new D1Orm(db);

    const checkInventoryTool = tool(
        async ({ productName }) => {
            const item = await orm.getInventoryItem(productName);
            if (!item) return `Product ${productName} not found in inventory.`;
            return `Product ${item.name}: Stock = ${item.stock}, Price = $${item.price}. Description: ${item.description}`;
        },
        {
            name: "check_inventory",
            description: "Check if a product is in stock and get its price/details.",
            schema: z.object({
                productName: z.string().describe("Name of the product to look up.")
            })
        }
    );

    const placeOrderTool = tool(
        async ({ userId, productName, quantity }) => {
            const item = await orm.getInventoryItem(productName);
            if (!item) return `Product ${productName} not found in inventory. Cannot place order.`;
            if (item.stock < quantity) {
                return `Sorry, only ${item.stock} items available for ${item.name}.`;
            }

            const orderId = await orm.createOrder(userId, item.id, quantity);
            return `Successfully placed order for ${quantity}x ${item.name}. Order ID is ${orderId}. Totals $${item.price * quantity}.`;
        },
        {
            name: "place_order",
            description: "Places an order for a product and records it in the database.",
            schema: z.object({
                userId: z.string().describe("The ID of the user placing the order."),
                productName: z.string().describe("Name of the product."),
                quantity: z.number().describe("Amount to order.")
            })
        }
    );

    return [checkInventoryTool, placeOrderTool];
};
