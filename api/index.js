//Node js
 
// Declare libraries
const express = require("express");
const mysql = require("mysql2/promise");
 
const app = express();
const port = 3000;
 
app.use(express.json());
//HTTP words: POST,GET,PUT,FETCH
//first endpoint
app.get("/",(req,res) => {
    res.status(200).json({message : "api is running"})
});
 
app.listen(port,()=> {
    console.log('The server is running, PORT : ${port}');
})