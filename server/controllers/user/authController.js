import asyncHandler from "../../middleware/asyncHandler.js";
import AuthService from "../../services/user/userAuthService.js";
import ResponseHandler from "../../utils/responseHandler.js";


class AuthController{
  static register = asyncHandler(async (req, res) => {
  const result = await AuthService.register(req.body);

  return ResponseHandler.created(
    res,
    result.message,
    { userId: result.userId }
  );
});


static verifyOtp = asyncHandler(async (req, res) => {
  const result = await AuthService.verifyOtp(req.body);

  return ResponseHandler.success(
    res,
    result.message,
    result.user
  );
});

static login = asyncHandler(async(req,res)=>{
    const result = await AuthService.login(req.body);
    return ResponseHandler.success(
      res,
      "Login successful",
      result
    )
})

static forgotPassword = asyncHandler(async(req,res)=>{

    const result = await AuthService.forgotPassword(req.body);
    return ResponseHandler.success(
      res,
      "Forgot password successfull",
      result
    )
})
static verifyOtpResetPassword = asyncHandler(async(req,res)=>{
  const result =await AuthService.verifyResetPasswordOtp(req.body);
  return ResponseHandler.success(
    res,
    'OTP verified successfully',
    result
  )
})
static resetPassword = asyncHandler(async(req,res)=>{
  const result = await AuthService.resetPassword(req.body);
  return ResponseHandler.success(res,"Reset Password successfull",result)
})
static resendOtp = asyncHandler(async(req,res)=>{
    const response = await AuthService.resentOtp(req.body);
    return ResponseHandler.success(res,
    'OTP verified successfully',
    response)
})
}
export default AuthController
