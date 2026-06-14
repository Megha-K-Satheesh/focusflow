

import express from "express";
import StudyPlanController from "../controllers/user/studyPlanController.js";
import authenticateUser from "../middleware/authenticateUser.js";



const router = express.Router();


router.post(
  "/create-study-plan",
  authenticateUser,
 StudyPlanController.createStudyPlan
);

export default router;
