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


static async getStudyPlan(userId) {
  if (!userId) {
    throw ErrorFactory.validation("UserId not provided");
  }


  let studyPlan = await StudyPlan.findOne({
    userId,
    status: "active",
  });

  
  if (!studyPlan) {
    studyPlan = await StudyPlan.findOne({
      userId,
      status: "completed",
    }).sort({ completedAt: -1 });
  }

 
  if (!studyPlan) {
    return {
      studyPlan: null,
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
    };
  }

  let totalTasks = 0;
  let completedTasks = 0;

  studyPlan.days.forEach((day) => {
    totalTasks += day.tasks.length;

    completedTasks += day.tasks.filter(
      (task) => task.completed
    ).length;
  });

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return {
    studyPlan,
    progress,
    completedTasks,
    totalTasks,
  };
}
  static async markTaskCompleted(userId, taskId) {
  if (!userId || !taskId) {
    throw ErrorFactory.validation("userId and taskId are required");
  }

  const studyPlan = await StudyPlan.findOne({
    userId,
    status: "active",
  });

  if (!studyPlan) {
    throw ErrorFactory.notFound("Study Plan not found");
  }

  let taskFound = false;

  for (const day of studyPlan.days) {
    for (const task of day.tasks) {
      if (task._id.toString() === taskId) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date() : null;

        taskFound = true;
        break;
      }
    }

    if (taskFound) break;
  }

  if (!taskFound) {
    throw ErrorFactory.notFound("Task not found");
  }

  let totalTasks = 0;
  let completedTasks = 0;

  studyPlan.days.forEach((day) => {
    totalTasks += day.tasks.length;

    completedTasks += day.tasks.filter(
      (task) => task.completed
    ).length;
  });

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  if (completedTasks === totalTasks && totalTasks > 0) {
    studyPlan.status = "completed";
    studyPlan.completedAt = new Date();
  } else {
    studyPlan.status = "active";
    studyPlan.completedAt = null;
  }

  await studyPlan.save();

  return {
    studyPlan,
    progress,
    completedTasks,
    totalTasks,
  };
}

}

export default StudyPlanService
