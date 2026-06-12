import User from "../../models/User.js";
import { generateOtp, sendOtpEmail } from "../../utils/emailService.js";
import { ErrorFactory } from "../../utils/errors.js";
import { generateUserToken } from "../../utils/jwt.js";
import logger from "../../utils/logger.js";

class AuthService{

    static async register(userData) {
      const { name, email, password } = userData;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw ErrorFactory.conflict("User already exists");
      }

      const otpDetails = generateOtp("EMAIL_VERIFICATION");

      const user = new User({
        name,
        email,
        password,
        isVerified:false,
        otpDetails: {
          code: otpDetails.code,
          expiresAt: otpDetails.expiresAt,
          purpose: otpDetails.purpose
    }
      });

      await user.save();

      await sendOtpEmail(user, otpDetails.code);

      return {
        message: "OTP sent to your email",
        userId: user._id
      };
    }

    static async verifyOtp(data) {
  const { userId, otp } = data;
  

  const user = await User.findById(userId);
  

  if (!user) {
    throw ErrorFactory.notFound("User not found");
  }

  if (!user.otpDetails) {
    throw ErrorFactory.validation("OTP not found");
  }

  if (Date.now() > user.otpDetails.expiresAt) {
    throw ErrorFactory.validation("OTP expired");
  }
  
   const isValidOtp = await user.compareOtp(otp)
  if (!isValidOtp) {
    throw ErrorFactory.validation("Invalid OTP");
  }


  user.isVerified = true;
  user.otpDetails = undefined;

  await user.save();

  return {
    message: "Email verified successfully",
      user: user.getPublicProfile()
  };
}

static async login(data){
  const {email,password} = data;
  const user = await User.findOne({email});
  if(!user){
    throw ErrorFactory.notFound("User not found");
  }
  if(!user.isVerified){
    throw ErrorFactory.authorization('Please verify your email before logging in');
  }
  const isPasswordValid = await user.comparePassword(password)
  if(!isPasswordValid){
    throw ErrorFactory.authentication("Invalid email or password")
  }
  user.lastLogin = new Date();
  await user.save()
  const token  = generateUserToken({
     id:user.id,
     email:user.email,
     role:user.role

  });
  logger.info(`User logged in with ${email}`)
  return {
    user:user.getPublicProfile(),
    
    token
  }
}
}

export default AuthService
