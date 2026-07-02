import apiClient from "../utils/apiClient";

export const interviewService = {
  startInterview(data) {
    return apiClient.post(
      "/interviews/start-interview",
      data
    );
  },

  transcribeAudio(formData) {
    return apiClient.post(
      "/interviews/transcribe",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  },
  getInterview(interviewId) {
    return apiClient.get(
      `/interviews/${interviewId}`
    );
  },

  getNextQuestion(interviewId) {
    return apiClient.get(
      `/interviews/${interviewId}/next`
    );
  },
 getPreviousQuestion(interviewId) {
    return apiClient.get(
      `/interviews/${interviewId}/previous`
    );
  }
  ,
  submitAnswer(interviewId, data) {
  return apiClient.post(
    `/interviews/${interviewId}/submit`,
    data
  );
},

 getFeedback(interviewId) {
    return apiClient.get(
      `/interviews/${interviewId}/feedback`
    );
  },

};
