import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock3,
  FileText,
  PlayCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Navbar from "../../components/ui/Navbar";
import { getInterviewHistory } from "../../redux/slices/user/interviewSlice";

function InterviewHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    history,
    historyLoading,
  } = useSelector((state) => state.interview);

  useEffect(() => {
    dispatch(getInterviewHistory());
  }, [dispatch]);

  if (historyLoading) {
    return <LoadingSpinner />;
  }

  const total = history?.length || 0;

  const completed =
    history?.filter(
      (item) => item.status === "completed"
    ).length || 0;

  const inProgress =
    history?.filter(
      (item) => item.status === "in_progress"
    ).length || 0;

  const avgScore =
    history && history.length
      ? (
          history.reduce(
            (acc, item) =>
              acc + (item.overallScore || 0),
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-violet-100 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-800">
            Interview History
          </h1>

          <p className="text-gray-500 mt-2">
            Review your previous interview
            sessions and feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-6">
            <FileText className="text-purple-600 mb-3" />
            <p className="text-gray-500 text-sm">
              Total Interviews
            </p>
            <h2 className="text-3xl font-bold text-purple-800 mt-2">
              {total}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-6">
            <CheckCircle className="text-green-600 mb-3" />
            <p className="text-gray-500 text-sm">
              Completed
            </p>
            <h2 className="text-3xl font-bold text-green-700 mt-2">
              {completed}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-6">
            <Clock3 className="text-yellow-600 mb-3" />
            <p className="text-gray-500 text-sm">
              In Progress
            </p>
            <h2 className="text-3xl font-bold text-yellow-700 mt-2">
              {inProgress}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-6">
            <Award className="text-purple-600 mb-3" />
            <p className="text-gray-500 text-sm">
              Average Score
            </p>
            <h2 className="text-3xl font-bold text-purple-800 mt-2">
              {avgScore}
            </h2>
          </div>
        </div>

        {history?.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-12 text-center">
            <FileText
              size={60}
              className="mx-auto text-purple-500 mb-5"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              No Interview History
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't completed any
              interviews yet.
            </p>

            <button
              onClick={() => navigate("/interview-start")}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:opacity-90"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div
                key={item.interviewId}
                className="bg-white border border-purple-100 rounded-3xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-purple-800">
                        {item.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status ===
                          "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status ===
                        "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Briefcase
                          size={18}
                          className="text-purple-600"
                        />
                        <span>
                          {item.role}
                        </span>
                      </div>

                      <div>
                        <strong>
                          Level:
                        </strong>{" "}
                        {item.level}
                      </div>

                      <div>
                        <strong>
                          Mode:
                        </strong>{" "}
                        {item.mode}
                      </div>

                      <div>
                        <strong>
                          Questions:
                        </strong>{" "}
                        {
                          item.totalQuestions
                        }
                      </div>

                      <div className="flex items-center gap-2">
                        <Award
                          size={18}
                          className="text-purple-600"
                        />
                        <span>
                          Score:{" "}
                          {item.overallScore ??
                            "-"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar
                          size={18}
                          className="text-purple-600"
                        />

                        <span>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {item.status ===
                    "completed" ? (
                      <button
                        onClick={() =>
                          navigate(
                            `/interview/${item.interviewId}/feedback`
                          )
                        }
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:opacity-90"
                      >
                        View Feedback
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(
                            `/interview-session/${item.interviewId}`
                          )
                        }
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                      >
                        <PlayCircle size={18} />
                        Resume
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default InterviewHistory;
