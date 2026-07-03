import express from "express";
import DashboardController from "../controllers/user/dashboardController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get(
  "/get-dashboard",
  authenticateUser,
  DashboardController.getDashboard
);

export default router;
