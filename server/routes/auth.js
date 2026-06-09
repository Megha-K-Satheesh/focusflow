import express from "express";

 import AuthController from "../controllers/user/authController.js";
const router = express.Router();


router.post("/register", AuthController.register);


router.post("/verify-otp", AuthController.verifyOtp);

export default router;
