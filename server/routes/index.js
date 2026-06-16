import authRoutes from "./auth.js";
import interviewRoutes from "./interview.js";
import studyPlanRoutes from "./studyPlan.js";
export const setupRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/study-plans",studyPlanRoutes)
  app.use("/api/interviews",interviewRoutes)
};
