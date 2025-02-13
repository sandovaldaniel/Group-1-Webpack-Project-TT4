const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: "localhost",
    user: "productsuser",
    password: "123456",
    database: "productsdb",
    port: 3306,
};

const pool = mysql.createPool(dbConfig);

async function connectToDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to the database successfully");
        return connection;
    } catch (e) {
        console.error("Database connection error:", e.message);
        process.exit(1);
    }
}

app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

app.post("/products", async (req, res) => {
    const { name, price, url, description } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
    }

    try {
        const conn = await pool.getConnection();
        const query = "INSERT INTO products (name, price, url, description) VALUES (?, ?, ?, ?)";
        await conn.execute(query, [name, price, url, description]);
        conn.release();

        res.status(201).json({ message: "Products created successfully" });
    } catch (e) {
        res.status(500).json({ error: `Server error: ${e.message}` });
    }
});

app.get("/products", async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.execute("SELECT * FROM products");
        conn.release();

        res.status(200).json(rows);
    } catch (e) {
        res.status(500).json({ error: `Server error: ${e.message}` });
    }
});

async function initDatabase() {
    try {
        const conn = await pool.getConnection();
        const [tables] = await conn.query("SHOW TABLES LIKE 'products'");

        if (tables.length === 0) {
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(200) NOT NULL,
                    price FLOAT NOT NULL,
                    url TEXT,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
            await conn.query(createTableQuery);
            console.log("Products table created.");
        } else {
            console.log("Products table already exists.");
        }
        conn.release();
    } catch (e) {
        console.error(`Database error: ${e.message}`);
        process.exit(1);
    }
}

initDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on PORT: ${port}`);
    });
});
