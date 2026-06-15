import apiClient from "../utils/apiClient";

export const studyPlanService = {
  createStudyPlan(data) {
    return apiClient.post("/study-plans/create-study-plan", data);
  },
  getStudyPlan() {
    return apiClient.get("/study-plans/get-study-plan");
  },
  markTaskCompleted(taskId) {
    return apiClient.patch(`/study-plans/mark-task-completed/${taskId}`);
  },
};
