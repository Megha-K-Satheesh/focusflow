import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  completed: {
    type: Boolean,
    default: false,
  },

  completedAt: {
    type: Date,
    default: null,
  },
});

const daySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },

  tasks: [taskSchema],
});

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },

    days: [daySchema],
  },
  {
    timestamps: true,
  }
);

const StudyPlan=new mongoose.model("StudyPlan", studyPlanSchema);
export default StudyPlan;
