

import express from "express";
import StudyPlanController from "../controllers/user/studyPlanController.js";
import authenticateUser from "../middleware/authenticateUser.js";



const router = express.Router();


router.post(
  "/create-study-plan",
  authenticateUser,
 StudyPlanController.createStudyPlan
);
router.get("/get-study-plan",authenticateUser,StudyPlanController.getStudyPlan)
router.patch("/mark-task-completed/:taskId",authenticateUser,StudyPlanController.markTaskCompleted)
export default router;
