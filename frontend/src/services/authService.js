import apiClient from "../utils/apiClient";

export const authService = {
  register(data) {
    return apiClient.post('/auth/register', data);
  },

  verifyOtp(data) {
    return apiClient.post('/auth/verify-otp', data);
  },
  login(data) {
    return apiClient.post('/auth/login', data);
  },

 
};
