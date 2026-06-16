import express from "express";
import InterviewController from "../controllers/user/interviewController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.post(
  "/start-interview",
  authenticateUser,
  InterviewController.startInterview
);


export default router;
