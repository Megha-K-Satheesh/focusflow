const mongoose = require("mongoose");
const logger = require("../utils/logger");



const  connectDB = async() =>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    logger.info("MongoDB connected")
  } catch (error) {
    console.log(err)
    process.exit(1)
  }
}
module.exports = connectDB
