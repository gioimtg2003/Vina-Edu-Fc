CREATE TABLE orders (
    orderId TEXT PRIMARY KEY,
    chatId TEXT NOT NULL,
    amount INTEGER NOT NULL,
    memo TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_orders_memo ON orders (memo);
