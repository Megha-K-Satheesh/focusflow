
import {
  ArrowRight,
  BookOpen,
  Brain,
  Sparkles,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WelcomeHero() {
  const {
    studyPlan,
    activeInterview,
    stats,
  } = useSelector((state) => state.dashboard);

  const progress = studyPlan?.progress || 0;

  const hasStudyPlan = studyPlan?.exists;

  const hasInterview = activeInterview?.exists;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 p-8 text-white shadow-xl">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
            <Sparkles size={16} />
            AI Powered Learning Companion
          </div>

          <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
            Welcome Back,
            <span className="block text-purple-200">
              Keep Learning 🚀
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-purple-100">
            Continue your learning journey with AI-generated roadmaps,
            mock interviews, and personalized feedback.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {hasStudyPlan ? (
              <Link
                to="/view-study-plan"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 transition hover:scale-105"
              >
                <BookOpen size={20} />
                Continue Study Plan
              </Link>
            ) : (
              <Link
                to="/create-study-plan"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 transition hover:scale-105"
              >
                <Target size={20} />
                Create Study Plan
              </Link>
            )}

            <Link
              to={
                hasInterview
                  ? `/interview-session/${activeInterview.interviewId}`
                  : "/interview-start"
              }
              className="flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/10"
            >
              <Brain size={20} />
              {hasInterview
                ? "Resume Interview"
                : "Start Interview"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-3xl bg-white/10 p-6 backdrop-blur-lg">
          <h3 className="text-lg font-semibold">
            Learning Progress
          </h3>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">
                {studyPlan?.completedTasks || 0}
              </p>

              <p className="mt-1 text-sm text-purple-100">
                Tasks Done
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">
                {stats?.interviewsTaken || 0}
              </p>

              <p className="mt-1 text-sm text-purple-100">
                Interviews
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">
                {stats?.averageScore || 0}
              </p>

              <p className="mt-1 text-sm text-purple-100">
                Avg Score
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-3xl font-bold">
                {studyPlan?.currentDay?.dayNumber || 0}
              </p>

              <p className="mt-1 text-sm text-purple-100">
                Current Day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeHero;
