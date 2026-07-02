import Interview from "../../models/Interview.js";
import StudyPlan from "../../models/StudyPlan.js";
import { ErrorFactory } from "../../utils/errors.js";
import { evaluateSingleAnswerWithAI, generateInterviewFromAI, generateTranscriptFromAI } from "./aiService.js";

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
  let aiResponse;

try {
  aiResponse = await generateInterviewFromAI(aiPayload);
} catch (err) {
  if (err.response?.status === 503) {
    throw ErrorFactory.generic(
      "AI service is temporarily busy. Please try again in a few seconds.",
      503
    );
  }

  throw err;
}


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
  static async transcribeAudio(file) {
  if (!file) {
    throw ErrorFactory.validation(
      "Audio file is required"
    );
  }

  const transcript =
    await generateTranscriptFromAI(file);

  return {
    transcript,
  };
}
static async getInterview(interviewId, userId) {
  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });

  if (!interview) {
    throw ErrorFactory.notFound(
      "Interview not found"
    );
  }
const currentQuestion =
  interview.questions[
    interview.currentQuestionIndex
  ];
  return {
    interviewId: interview._id,
    currentQuestion,
    questionNumber:
      interview.currentQuestionIndex + 1,
    totalQuestions:
      interview.totalQuestions,
       
  };
}

static async getNextQuestion(
  interviewId,
  userId
) {
  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });

  if (!interview) {
    throw ErrorFactory.notFound(
      "Interview not found"
    );
  }

  if (
    interview.currentQuestionIndex >=
    interview.questions.length - 1
  ) {
    return {
      completed: true, 
      
    };
  }

  interview.currentQuestionIndex += 1;

  await interview.save();
const currentQuestion =
  interview.questions[
    interview.currentQuestionIndex
  ];
  return {
    interviewId: interview._id,
    currentQuestion,
    questionNumber:
      interview.currentQuestionIndex + 1,
    totalQuestions:
      interview.totalQuestions,
      
  };
}



static async getPreviousQuestion(
  interviewId,
  userId
) {
  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });

  if (!interview) {
    throw ErrorFactory.notFound(
      "Interview not found"
    );
  }

  if (interview.currentQuestionIndex === 0) {
    const currentQuestion =
      interview.questions[0];

    return {
      interviewId: interview._id,
      currentQuestion,
      questionNumber: 1,
      totalQuestions:
        interview.totalQuestions,
      isFirstQuestion: true,
   
    };
  }

  interview.currentQuestionIndex -= 1;

  await interview.save();

  const currentQuestion =
    interview.questions[
      interview.currentQuestionIndex
    ];

  return {
    interviewId: interview._id,
    currentQuestion,
    questionNumber:
      interview.currentQuestionIndex + 1,
    totalQuestions:
      interview.totalQuestions,
    isFirstQuestion:
      interview.currentQuestionIndex === 0,
   
  };
}

static async submitAnswer(interviewId, userId, data) {
  const { answer, code, language } = data;

  const interview = await Interview.findOne({
    _id: interviewId,
    userId,
  });

  if (!interview) {
    throw ErrorFactory.notFound("Interview not found");
  }

  const question =
    interview.questions[interview.currentQuestionIndex];

  if (!question) {
    throw ErrorFactory.notFound("Question not found");
  }

  if (question.type === "theory" && !answer?.trim()) {
    throw ErrorFactory.validation("Answer is required");
  }

  if (question.type === "coding" && !code?.trim()) {
    throw ErrorFactory.validation("Code is required");
  }

  question.answer = answer || "";
  question.code = code || "";
  question.language = language || "";
  question.status = "answered";

  const aiResult = await evaluateSingleAnswerWithAI({
    question: question.question,
    type: question.type,
    answer,
    code,
    language,
  });

  question.score = aiResult.score || 0;
  question.feedback = aiResult.feedback || "";
  question.aiEvaluation = {
    strengths: aiResult.strengths || [],
    improvements: aiResult.improvements || [],
    explanation: aiResult.explanation || "",
  };

  question.status = "evaluated";
  question.submitted =true

  await interview.save();

  return {
    success: true,
    status: question.status,
    score: question.score,
    feedback: question.feedback,
    questionNumber: interview.currentQuestionIndex + 1,
    message: "Answer submitted and evaluated successfully",
  };
}


 static async getFeedback(interviewId, userId) {
    const interview = await Interview.findOne({
      _id: interviewId,
      userId,
    });

    if (!interview) {
      throw ErrorFactory.notFound("Interview not found");
    }
     

  if (interview.status !== "completed") {
    interview.status = "completed";
    interview.completedAt = new Date();
    await interview.save();
  }
    const questions = interview.questions;

    const totalScore = questions.reduce(
      (acc, q) => acc + (q.score || 0),
      0
    );

    const evaluatedQuestions = questions.filter(
      (q) => q.status === "evaluated"
    );

    const feedbackByQuestion = questions.map((q) => ({
      questionId: q.questionId,
      question: q.question,
      type: q.type,
      topic: q.topic,
      answer: q.answer,
      code: q.code,
      score: q.score || 0,
      feedback: q.feedback,
      aiEvaluation: q.aiEvaluation || {
        strengths: [],
        improvements: [],
        explanation: "",
      },
      status: q.status,
    }));

    const strengths = [];
    const improvements = [];

    questions.forEach((q) => {
      if (q.aiEvaluation?.strengths?.length) {
        strengths.push(...q.aiEvaluation.strengths);
      }
      if (q.aiEvaluation?.improvements?.length) {
        improvements.push(...q.aiEvaluation.improvements);
      }
    });

    const overallScore = questions.length
      ? Math.round(totalScore / questions.length)
      : 0;

    const performanceLevel =
      overallScore >= 8
        ? "Excellent"
        : overallScore >= 6
        ? "Good"
        : overallScore >= 4
        ? "Average"
        : "Needs Improvement";

    return {
      success: true,
      interviewId: interview._id,
      role: interview.role,
      level: interview.level,
      status: interview.status,

      summary: {
        overallScore,
        totalQuestions: questions.length,
        evaluatedQuestions: evaluatedQuestions.length,
        performanceLevel,
      },

      insights: {
        strengths: [...new Set(strengths)],
        improvements: [...new Set(improvements)],
      },

      questions: feedbackByQuestion,
    };
  }
}

export default InterviewService;
