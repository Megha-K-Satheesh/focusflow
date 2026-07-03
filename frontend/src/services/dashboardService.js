import apiClient from "../utils/apiClient";

export const dashboardService = {
  getDashboard() {
    return apiClient.get("/dashboard/get-dashboard");
  },

 
};
