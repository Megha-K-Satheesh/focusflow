import dotenv from "dotenv";

dotenv.config();

import express from "express";
import connectDB from "./config/dataBase.js";
import errorHandler from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { setupRoutes } from "./routes/index.js";
import logger from "./utils/logger.js";

const app = express();


app.use(express.json());
app.use(requestLogger);
setupRoutes(app);
app.use(errorHandler);



const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT ||5000;
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("DB connection failed", error);
    process.exit(1);
  }
};

startServer();
