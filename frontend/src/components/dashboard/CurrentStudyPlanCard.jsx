
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



function CurrentStudyPlanCard() {
  const { studyPlan } = useSelector(
    (state) => state.dashboard
  );

if (!studyPlan?.exists) {
  return (
    <div className="w-full min-h-[420px] rounded-3xl border border-dashed border-purple-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
          <BookOpen size={40} className="text-purple-600" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          No Active Study Plan
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
          Create your first AI-powered study plan and receive a personalized
          roadmap tailored to your learning goals. Track your daily progress,
          complete tasks, and stay consistent throughout your journey.
        </p>

        <Link
          to="/create-study-plan"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
        >
          Create Study Plan
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

if (studyPlan?.status === "completed") {
  return (
    <div className="w-full min-h-[420px] rounded-3xl border border-green-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="text-green-600" size={40} />
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Study Plan Completed
          </h2>

          <p className="mt-2 mx-auto max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
            Congratulations! You've successfully completed your study plan.
            Keep your momentum going by creating a new roadmap or putting your
            knowledge to the test with an AI interview.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-green-50 p-5">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
            <span>Overall Progress</span>
            <span className="font-semibold text-green-700">100%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-green-100">
            <div className="h-full w-full rounded-full bg-green-600" />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-green-700">
            <CheckCircle2 size={18} />
            <span className="font-medium">
              {studyPlan.completedTasks}/{studyPlan.totalTasks} Tasks Completed
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/create-study-plan"
            className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            Create New Study Plan
          </Link>

          <Link
            to="/interviews"
            className="inline-flex items-center justify-center rounded-2xl border border-purple-200 px-6 py-3 font-medium text-purple-700 transition hover:bg-purple-50"
          >
            Start AI Interview
          </Link>
        </div>
      </div>
    </div>
  );
}

  const getMessage = (progress) => {
    if (progress >= 90)
      return "Outstanding! You're almost ready to complete your study plan.";

    if (progress >= 70)
      return "Excellent progress! Keep pushing toward your goal.";

    if (progress >= 40)
      return "You're making steady progress. Stay consistent every day.";

    if (progress > 0)
      return "Great start! Keep learning and building momentum.";

    return "Let's begin your learning journey.";
  };

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-purple-100 p-3 text-purple-700">
          <BookOpen size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Current Study Plan
          </h2>

          <p className="text-sm text-gray-500">
            Continue your learning roadmap
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-900">
          {studyPlan.title}
        </h3>

        <p className="mt-2 text-gray-500">
          {studyPlan.goal}
        </p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600">
              Overall Progress
            </span>

            <span className="font-semibold text-purple-700">
              {studyPlan.progress}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-purple-600 transition-all duration-500"
              style={{
                width: `${studyPlan.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-purple-50 p-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Target size={18} />
              <p className="text-xs font-medium text-gray-500">
                Level
              </p>
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {studyPlan.level}
            </p>
          </div>

          <div className="rounded-2xl bg-purple-50 p-4">
            <div className="flex items-center gap-2 text-purple-600">
              <CalendarDays size={18} />
              <p className="text-xs font-medium text-gray-500">
                Current Day
              </p>
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              Day {studyPlan.currentDay?.dayNumber || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-purple-50 p-4">
            <div className="flex items-center gap-2 text-purple-600">
              <CheckCircle2 size={18} />
              <p className="text-xs font-medium text-gray-500">
                Tasks
              </p>
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {studyPlan.completedTasks}/{studyPlan.totalTasks}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={22}
              className="mt-0.5 text-green-600"
            />

            <div>
              <p className="font-semibold text-green-700">
                Keep Learning
              </p>

              <p className="mt-1 text-sm text-green-600">
                {getMessage(studyPlan.progress)}
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/view-study-plan"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
        >
          Continue Learning
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default CurrentStudyPlanCard;
