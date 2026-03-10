export interface InventoryItem {
    id: string;
    name: string;
    stock: number;
    price: number;
    description: string;
}

export class D1Orm {
    private db: D1Database;

    constructor(db: D1Database) {
        this.db = db;
    }

    async getInventoryItem(name: string): Promise<InventoryItem | null> {
        // Find closest match using LIKE. In a real system you'd use FTS or exact matches.
        const query = `SELECT * FROM inventory WHERE name LIKE ? LIMIT 1`;
        const result = await this.db.prepare(query).bind(`%${name}%`).first<InventoryItem>();
        return result || null;
    }

    async createOrder(userId: string, itemId: string, quantity: number): Promise<string> {
        const orderId = crypto.randomUUID();
        const query = `INSERT INTO orders_legacy (id, user_id, item_id, quantity, status) VALUES (?, ?, ?, ?, 'pending')`;
        // if orders_legacy doesn't exist, this might fail, but preserving for existing agent logic
        try { await this.db.prepare(query).bind(orderId, userId, itemId, quantity).run(); } catch (e) { console.error(e) }
        return orderId;
    }

    async createPaymentOrder(orderId: string, chatId: string, amount: number, memo: string): Promise<void> {
        const query = `INSERT INTO orders (orderId, chatId, amount, memo, status) VALUES (?, ?, ?, ?, 'pending')`;
        await this.db.prepare(query).bind(orderId, chatId, amount, memo).run();
    }

    async completeOrderStatus(memo: string, amount: number): Promise<string | null> {
        // Find the pending order and update it to completed, returning the chatId to notify later
        const selectQuery = `SELECT chatId, status FROM orders WHERE memo = ? AND amount = ? AND status = 'pending'`;
        const order = await this.db.prepare(selectQuery).bind(memo, amount).first<{ chatId: string, status: string }>();

        if (order) {
            const updateQuery = `UPDATE orders SET status = 'completed' WHERE memo = ?`;
            await this.db.prepare(updateQuery).bind(memo).run();
            return order.chatId;
        }
        return null;
    }

    async listInventoryItems(): Promise<InventoryItem[]> {
        const query = `SELECT * FROM inventory`;
        const result = await this.db.prepare(query).all<InventoryItem>();
        return result.results;
    }
}
