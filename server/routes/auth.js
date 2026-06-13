import express from "express";

 import AuthController from "../controllers/user/authController.js";
const router = express.Router();


router.post("/register", AuthController.register);


router.post("/verify-otp", AuthController.verifyOtp);
router.post("/login",AuthController.login);
router.post("/forgot-password",AuthController.forgotPassword)
router.post("/verify-reset-password-otp",AuthController.verifyOtpResetPassword)
router.post("/reset-password",AuthController.resetPassword)

export default router;
