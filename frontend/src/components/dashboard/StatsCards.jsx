
import {
  Award,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
} from "lucide-react";
import { useSelector } from "react-redux";

function StatsCards() {
  const { studyPlan, stats } = useSelector(
    (state) => state.dashboard
  );

  const hasStudyPlan = studyPlan?.exists;
  const isActive = studyPlan?.status === "active";
  const isCompleted = studyPlan?.status === "completed";

  const interviewProgress =
    stats?.interviewsTaken > 0
      ? Math.round(
          (stats.completedInterviews /
            stats.interviewsTaken) *
            100
        )
      : 0;

  const scoreProgress = Math.min(
    (stats?.averageScore || 0) * 10,
    100
  );

  const currentDayProgress =
    isActive &&
    studyPlan?.currentDay?.dayNumber &&
    studyPlan?.duration
      ? Math.round(
          (studyPlan.currentDay.dayNumber /
            studyPlan.duration) *
            100
        )
      : isCompleted
      ? 100
      : 0;

  const cards = [
    {
      title: "Study Progress",
      value: !hasStudyPlan
        ? "--"
        : `${studyPlan.progress}%`,
      subtitle: !hasStudyPlan
        ? "No Study Plan"
        : isCompleted
        ? "Study Plan Completed"
        : `${studyPlan.completedTasks} / ${studyPlan.totalTasks} Tasks Completed`,
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
      progress: !hasStudyPlan
        ? 0
        : studyPlan.progress,
    },
    {
      title: "Interviews",
      value: stats?.interviewsTaken || 0,
      subtitle: `${stats?.completedInterviews || 0} Completed`,
      icon: Brain,
      color: "bg-indigo-100 text-indigo-700",
      progress: interviewProgress,
    },
    {
      title: "Average Score",
      value: `${stats?.averageScore || 0}/10`,
      subtitle: "Overall Interview Performance",
      icon: Award,
      color: "bg-green-100 text-green-700",
      progress: scoreProgress,
    },
    {
      title: "Current Day",
      value: !hasStudyPlan
        ? "--"
        : isCompleted
        ? "✓"
        : studyPlan.currentDay?.dayNumber || 0,
      subtitle: !hasStudyPlan
        ? "No Study Plan"
        : isCompleted
        ? "Study Plan Completed"
        : studyPlan.currentDay?.topic,
      icon: Target,
      color: "bg-orange-100 text-orange-700",
      progress: currentDayProgress,
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div
                className={`rounded-2xl p-3 ${card.color}`}
              >
                <Icon size={26} />
              </div>

              <TrendingUp
                size={18}
                className="text-green-500"
              />
            </div>

            <h3 className="mt-6 text-sm font-medium text-gray-500">
              {card.title}
            </h3>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              {card.value}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {card.subtitle}
            </p>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{card.progress}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-700"
                  style={{
                    width: `${card.progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default StatsCards;
