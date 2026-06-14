import asyncHandler from "../../middleware/asyncHandler.js";
import StudyPlanService from "../../services/user/studyPlanService.js";
import ResponseHandler from "../../utils/responseHandler.js";

class StudyPlanController{

   static createStudyPlan = asyncHandler(async(req,res)=>{
       const result = await StudyPlanService.createStudyPlan(req.user.id,req.body);
       return ResponseHandler.success(res,"Study plan created",result)
   })
}
export default StudyPlanController
