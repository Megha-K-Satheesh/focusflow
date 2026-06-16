import Interview from "../../models/Interview.js";
import StudyPlan from "../../models/StudyPlan.js";
import { ErrorFactory } from "../../utils/errors.js";
import { generateInterviewFromAI } from "./aiService.js";

class InterviewService {
  static async startInterview(userId, data) {
    const {
      interviewType,
      role,
      level,
      mode,
      questionCount,
    } = data;

    if (!interviewType) {
      throw ErrorFactory.validation(
        "Interview type is required"
      );
    }

    let aiPayload = {};
    let studyPlanId = null;

    if (interviewType === "study-plan") {
      const studyPlan = await StudyPlan.findOne({
        userId,
        status: "active",
      });

      if (!studyPlan) {
        throw ErrorFactory.notFound(
          "No active study plan found"
        );
      }

      const completedTopics = studyPlan.days
        .filter((day) =>
          day.tasks.every((task) => task.completed)
        )
        .map((day) => day.topic);

      if (completedTopics.length === 0) {
        throw ErrorFactory.validation(
          "Complete some topics before taking a roadmap interview"
        );
      }

      studyPlanId = studyPlan._id;

      aiPayload = {
        interviewType,
        topics: completedTopics,
        level: studyPlan.level,
        mode: mode || "mixed",
        questionCount: questionCount || 10,
      };
    }

    if (interviewType === "custom") {
      if (!role || !level) {
        throw ErrorFactory.validation(
          "Role and level are required"
        );
      }

      aiPayload = {
        interviewType,
        role,
        level,
        mode: mode || "mixed",
        questionCount: questionCount || 10,
      };
    }

    const aiResponse =
      await generateInterviewFromAI(aiPayload);

    if (
      !aiResponse ||
      !aiResponse.questions ||
      aiResponse.questions.length === 0
    ) {
      throw ErrorFactory.generic(
        "Failed to generate interview",
        500
      );
    }

    const interview = await Interview.create({
      userId,

      studyPlanId,

      interviewType,

      role:
        role ||
        aiResponse.role ||
        "Study Plan Interview",

      level:
        level ||
        aiPayload.level,

      mode: mode || "mixed",

      totalQuestions:
        aiResponse.questions.length,

      currentQuestionIndex: 0,

      status: "in_progress",

      startedAt: new Date(),

      questions: aiResponse.questions,
    });

    return {
      interviewId: interview._id,

      currentQuestion:
        interview.questions[0],

      questionNumber: 1,

      totalQuestions:
        interview.totalQuestions,
    };
  }
}

export default InterviewService;
