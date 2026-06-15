import asyncHandler from "../../middleware/asyncHandler.js";
import StudyPlanService from "../../services/user/studyPlanService.js";
import ResponseHandler from "../../utils/responseHandler.js";

class StudyPlanController{

   static createStudyPlan = asyncHandler(async(req,res)=>{
       const result = await StudyPlanService.createStudyPlan(req.user.id,req.body);
       return ResponseHandler.success(res,"Study plan created",result)
   })
   static getStudyPlan = asyncHandler(async(req,res)=>{
     const result = await StudyPlanService.getStudyPlan(req.user.id)
     return ResponseHandler.success(res,"Active study plan retrieved successfully",result)
   })

   static markTaskCompleted = asyncHandler(async(req,res)=>{
      const {taskId} = req.params;
     
     const result = await StudyPlanService.markTaskCompleted(req.user.id,taskId)

     return ResponseHandler.success(res,"Task status updated successfully",result)
   })
}
export default StudyPlanController
