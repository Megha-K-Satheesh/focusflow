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


static getInterview = asyncHandler(
  async (req, res) => {
    const result =
      await InterviewService.getInterview(
        req.params.interviewId,
        req.user.id
      );

    return ResponseHandler.success(
      res,
      "Interview fetched successfully",
      result
    );
  }
);

static getNextQuestion = asyncHandler(
  async (req, res) => {
    const result =
      await InterviewService.getNextQuestion(
        req.params.interviewId,
        req.user.id
      );

    return ResponseHandler.success(
      res,
      "Next question fetched successfully",
      result
    );
  }
);



   static transcribeAudio = asyncHandler(
    async (req, res) => {
      const result =
        await InterviewService.transcribeAudio(
          req.file
        );

      return ResponseHandler.success(
        res,
        "Audio transcribed successfully",
        result
      );
    }
  );

 
}

export default InterviewController;
