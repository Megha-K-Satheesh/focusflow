import Interview from "../../models/Interview.js";
import StudyPlan from "../../models/StudyPlan.js";


class DashboardService {
 



   static async getDashboard(userId) {
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

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    let studyPlanData = {
      exists: false,
    };

    if (studyPlan) {
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
          : Math.round(
              (completedTasks / totalTasks) * 100
            );

      const currentDay =
        studyPlan.status === "active"
          ? studyPlan.days.find((day) =>
              day.tasks.some((task) => !task.completed)
            ) || studyPlan.days.at(-1)
          : null;

      studyPlanData = {
        exists: true,
        status: studyPlan.status,
        studyPlanId: studyPlan._id,
        title: studyPlan.title,
        goal: studyPlan.goal,
        level: studyPlan.level,
        duration: studyPlan.duration,
        progress,
        completedTasks,
        totalTasks,
        currentDay: currentDay
          ? {
              dayNumber: currentDay.dayNumber,
              topic: currentDay.topic,
            }
          : null,
      };
    }

    const activeInterview = interviews.find(
      (interview) => interview.status === "in_progress"
    );

    const completedInterviews = interviews.filter(
      (interview) => interview.status === "completed"
    );

    const averageScore =
      completedInterviews.length > 0
        ? Math.round(
            completedInterviews.reduce(
              (sum, interview) =>
                sum + (interview.overallScore || 0),
              0
            ) / completedInterviews.length
          )
        : 0;

    const recentInterviews = interviews
      .slice(0, 5)
      .map((interview) => ({
        interviewId: interview._id,
        title: interview.title,
        role: interview.role,
        status: interview.status,
        score: interview.overallScore,
        createdAt: interview.createdAt,
      }));

    return {
      studyPlan: studyPlanData,

      activeInterview: activeInterview
        ? {
            exists: true,
            interviewId: activeInterview._id,
            title: activeInterview.title,
            role: activeInterview.role,
            currentQuestion:
              activeInterview.currentQuestionIndex + 1,
            totalQuestions:
              activeInterview.totalQuestions,
          }
        : {
            exists: false,
          },

      stats: {
        interviewsTaken: interviews.length,
        completedInterviews:
          completedInterviews.length,
        averageScore,
      },

      recentInterviews,
    };
  }
}

export default DashboardService;
