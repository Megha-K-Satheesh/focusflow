import StudyPlan from "../../models/StudyPlan.js";
import { ErrorFactory } from "../../utils/errors.js";
import { generateRoadmapFromAI } from "./aiService.js";

class StudyPlanService {
      static async createStudyPlan(userId,data) {

        const existingPlan = await StudyPlan.findOne({
          userId,
          status:"active"
        })
        if(existingPlan){
           throw ErrorFactory.validation(" You already have an active study plan. Complete or archive it before creating a new one.")
        }
    const {   goal,
  level,
  duration,
  dailyHours,
  targetOutcome,
  currentKnowledge,
  weakAreas,
  notes} = data;

    if (!goal || !level || !duration || !targetOutcome || !currentKnowledge||
  !weakAreas||
  !notes) {
      throw ErrorFactory.validation("Missing required fields");
    }


    const aiResponse = await generateRoadmapFromAI({
       goal,
  level,
  duration,
  dailyHours,
  targetOutcome,
  currentKnowledge,
  weakAreas,
  notes,
      
    });

    if (!aiResponse || !aiResponse.days) {
      throw ErrorFactory.generic("Invalid AI response", 500);
    }

  
    const studyPlan = await StudyPlan.create({
      userId,
      title: aiResponse.title || `${duration}-Day ${goal} Plan`,
      goal,
      level,
      duration,
      startDate: new Date(),
      status: "active",
      days: aiResponse.days,
    });

    return studyPlan;
  }
}

export default StudyPlanService
