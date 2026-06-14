import authRoutes from "./auth.js";
import studyPlanRoutes from "./studyPlan.js";
export const setupRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/study-plans",studyPlanRoutes)
};
