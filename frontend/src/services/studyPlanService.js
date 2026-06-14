import apiClient from "../utils/apiClient";

export const studyPlanService = {
  createStudyPlan(data) {
    return apiClient.post("/study-plans/create-study-plan", data);
  },
};
