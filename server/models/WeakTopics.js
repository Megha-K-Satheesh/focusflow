import mongoose from "mongoose";

const weakTopicSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    totalAttempts: {
      type: Number,
      default: 0,
    },

    lastInterviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WeakTopic", weakTopicSchema);
