
ALTER TABLE orders ADD COLUMN farmer_id INT NOT NULL AFTER consumer_id;
ALTER TABLE orders MODIFY status ENUM('pending','completed','cancelled') DEFAULT 'pending';
