const dotenv = require("dotenv")
const express = require("express");
const connectDB = require("./config/dataBase");
const logger = require("./utils/logger");

const app = express();

dotenv.config()
connectDB()
app.get('/',(req,res)=>{
    res.send("Server is running...")
})

app.listen(process.env.PORT,()=>{
   logger.info(`server is running on the  port ${process.env.PORT}`)
})
