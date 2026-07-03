
import {
  ArrowRight,
  Brain,
  PlayCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function InterviewCard() {
  const { activeInterview: interview } = useSelector(
    (state) => state.dashboard
  );

  const progress = interview?.totalQuestions
    ? Math.min(
        Math.round(
          (interview.currentQuestion /
            interview.totalQuestions) *
            100
        ),
        100
      )
    : 0;

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
          <Brain size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            AI Interview
          </h2>

          <p className="text-sm text-gray-500">
            Practice with AI-powered mock interviews
          </p>
        </div>
      </div>

      {interview?.exists ? (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900">
            {interview.title}
          </h3>

          <p className="mt-2 text-gray-500">
            Continue where you left off.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-indigo-50 p-4">
              <p className="text-xs text-gray-500">
                Role
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {interview.role}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-4">
              <p className="text-xs text-gray-500">
                Status
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {interview.status || "In Progress"}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-4">
              <p className="text-xs text-gray-500">
                Current Question
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {interview.currentQuestion} of{" "}
                {interview.totalQuestions}
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-4">
              <p className="text-xs text-gray-500">
                Progress
              </p>

              <p className="mt-1 font-semibold text-indigo-600">
                {progress}%
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Interview Progress
              </span>

              <span className="font-semibold text-indigo-600">
                {progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <Link
            to={`/interview-session/${interview.interviewId}`}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            <PlayCircle size={18} />
            Resume Interview
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-2xl border-2 border-dashed border-indigo-200 px-6 py-10 text-center">
          <div className="rounded-full bg-indigo-100 p-5 text-indigo-600">
            <Brain size={36} />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-gray-900">
            No Active Interview
          </h3>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Start an AI-powered mock interview to practice
            coding and theory questions with instant AI
            feedback.
          </p>

          <Link
            to="/start-interview"
            className="mt-6 flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Start Interview
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default InterviewCard;
