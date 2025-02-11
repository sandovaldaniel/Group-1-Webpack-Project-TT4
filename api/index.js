//Node js
 
// Declare libraries
const express = require("express");
const mysql = require("mysql2/promise");
 
const app = express();
const port = 3000;

const dbConfig = {
    host: "localhost",
    user: "in-class-user",
    password: "123456",
    database: "in-class-db",
    port: 3306, 
  };


app.use(express.json());
//HTTP words: POST,GET,PUT,FETCH
//first endpoint
//get
app.get("/",(req,res) => {
    res.status(200).json({message : "api is running"})
});
 
//post
app.post("/message", async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !price || !message) {
      return res.status(400).json({ error: "All field are required" });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);
        const query = "INSERT INTO users (name, price, message) VALUES (?, ?, ?)";
        await conn.execute(query, [name, email, message]);
        await conn.end();
    
        res.status(201).json({ message: "Created with success" });
      } catch (e) {
        res.status(500), json({ error: `Something happens in the server: ${e}` });
      }
    });

    app.get("/message", async () => {
        try {
          const conn = await mysql.createConnection(dbConfig);
          const [rows] = await conn.execute("SELECT * FROM messages"); // an object { ..., rows: [{..}]}
          await conn.end();
          res.status(200).json(rows); // [ {name, email, message} ]
        } catch (e) {
          res.status(500).json({ error: `Fail: ${e}` });
        }
      });



async function initDatabase() {
    try {
      const conn = await mysql.createConnection(dbConfig);
      const [tables] = await conn.query("SHOW TABLES like 'messages'"); // an object {..., tables: [ ... ]}
  
      if (tables.length === 0) {
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            price INT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        await conn.query(createTableQuery);
      console.log("Table created");
    } else {
      console.log("Table already created");
    }

    await conn.end();
  } catch (e) {
    console.error(`Database error: ${e}`);
    process.exit(1);
  }
}



initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`The server is runing, PORT: ${port}`);
  });
})

