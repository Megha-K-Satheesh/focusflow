import express from "express";
import { upload } from "../config/upload.js";
import InterviewController from "../controllers/user/interviewController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.post(
  "/start-interview",
  authenticateUser,
  InterviewController.startInterview
);
router.get(
  "/:interviewId",
  authenticateUser,
  InterviewController.getInterview
);

router.get(
  "/:interviewId/next",
  authenticateUser,
  InterviewController.getNextQuestion
);

router.post(
  "/transcribe",
  upload.single("audio"),
  InterviewController.transcribeAudio
);
router.get(
  "/:interviewId/previous",
  authenticateUser,
  InterviewController.getPreviousQuestion
);
router.post(
  "/:interviewId/submit",
  authenticateUser,
  InterviewController.submitAnswer
)
router.get(
  "/:interviewId/feedback",
  authenticateUser,
  InterviewController.getFeedback
);
export default router;
