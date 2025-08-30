INSERT INTO users (name, email, password, role)
VALUES ("Farmer John", "farmer@example.com", "123456", "farmer");

INSERT INTO products (farmer_id, name, description, price, harvest_date, qr_code_url)
VALUES (1, "Fresh Mango", "Sweet organic mangoes", 150.00, "2025-08-29", "qr-code-link");
SELECT * FROM users;
SELECT * FROM products;

