import asyncHandler from "../../middleware/asyncHandler.js";
import InterviewService from "../../services/user/interviewService.js";
import ResponseHandler from "../../utils/responseHandler.js";

class InterviewController {

  static startInterview = asyncHandler(async (req, res) => {
    const result = await InterviewService.startInterview(
      req.user.id,
      req.body
    );

    return ResponseHandler.success(
      res,
      "Interview started successfully",
      result
    );
  });

 

 
}

export default InterviewController;
