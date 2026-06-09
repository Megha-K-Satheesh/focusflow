import asyncHandler from "../../middleware/asyncHandler.js";
import AuthService from "../../services/user/AuthService.js";
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

}
export default AuthController
