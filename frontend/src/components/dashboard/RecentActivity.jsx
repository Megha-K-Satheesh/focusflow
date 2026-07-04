
import {
  ArrowRight,
  Calendar,
  Clock,
  Trophy,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RecentActivity() {
  const { recentInterviews } = useSelector(
    (state) => state.dashboard
  );

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-gray-500">
            Your latest interview sessions.
          </p>
        </div>

        <Link
          to="/interview-history"
          className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {recentInterviews?.length ? (
        <div className="space-y-4">
          {recentInterviews.map((interview) => (
            <div
              key={interview.interviewId}
              className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {interview.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {interview.role}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2">
                    <Clock
                      size={18}
                      className="text-indigo-600"
                    />
                    <span className="capitalize">
                      {interview.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2">
                    <Trophy
                      size={18}
                      className="text-yellow-500"
                    />
                    <span>Score: {interview.score}</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2">
                    <Calendar
                      size={18}
                      className="text-green-600"
                    />
                    <span>
                      {new Date(
                        interview.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-purple-200 bg-white p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            No Recent Activity
          </h3>

          <p className="mt-2 text-gray-500">
            Complete your first AI interview to see your
            activity here.
          </p>

          <Link
            to="/interview-start"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            Start Interview
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}

export default RecentActivity;
