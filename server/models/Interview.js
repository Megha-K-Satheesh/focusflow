import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["theory", "coding", "behavioral"],
    required: true,
  },

  answer: {
    type: String,
    default: "",
  },

  score: {
    type: Number,
    default: null,
  },

  feedback: {
    type: String,
    default: "",
  },

  topic: {
    type: String,
    default: "",
  },

  language: {
    type: String,
    default: "",
  },

  code: {
    type: String,
    default: "",
  },
});

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    studyPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyPlan",
      default: null,
    },

   title: {
  type: String,
  default: "Mock Interview"
},

    role: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    mode: {
      type: String,
      enum: ["theory", "coding", "mixed"],
      default: "mixed",
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },

    currentQuestionIndex: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    questions: [answerSchema],

    overallScore: {
      type: Number,
      default: 0,
    },

    communicationScore: {
      type: Number,
      default: 0,
    },

    technicalScore: {
      type: Number,
      default: 0,
    },

    codingScore: {
      type: Number,
      default: 0,
    },

    startedAt: Date,

    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);
