import authRoutes from "./auth.js";

export const setupRoutes = (app) => {
  app.use("/api/auth", authRoutes);
};
