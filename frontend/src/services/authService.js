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
  forgotPassword(data) {
    return apiClient.post('/auth/forgot-password', data);
  },
  verifyResetPasswordOtp(data) {
    return apiClient.post('/auth/verify-reset-password-otp', data);
  },
  resetPassword(data) {
    return apiClient.post('/auth/reset-password', data);
  },

 
};
