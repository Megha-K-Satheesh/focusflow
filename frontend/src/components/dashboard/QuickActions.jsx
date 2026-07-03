
import {
  ArrowRight,
  BookOpen,
  Brain,
  History,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function QuickActions() {
  const { studyPlan, activeInterview } = useSelector(
    (state) => state.dashboard
  );

  const actions = [
    {
      title: studyPlan?.exists
        ? "Continue Study Plan"
        : "Create Study Plan",
      description: studyPlan?.exists
        ? "Continue your personalized AI learning roadmap."
        : "Generate a personalized study plan based on your goals.",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
      button: studyPlan?.exists
        ? "Continue"
        : "Create",
      link: studyPlan?.exists
        ? "/view-study-plan"
        : "/create-study-plan",
    },
    {
      title: activeInterview?.exists
        ? "Resume Interview"
        : "Start Interview",
      description: activeInterview?.exists
        ? "Continue your AI mock interview where you left off."
        : "Practice real interview questions with AI feedback.",
      icon: Brain,
      color: "bg-indigo-100 text-indigo-700",
      button: activeInterview?.exists
        ? "Resume"
        : "Start",
      link: activeInterview?.exists
        ? `/interview-session/${activeInterview.interviewId}`
        : "/start-interview",
    },
    {
      title: "Interview History",
      description:
        "Review your previous interviews, scores, and AI feedback.",
      icon: History,
      color: "bg-green-100 text-green-700",
      button: "View History",
      link: "/interview-history",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-gray-500">
          Jump into your most common tasks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.title}
              className="group flex flex-col rounded-3xl border border-purple-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`inline-flex w-fit rounded-2xl p-3 ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-gray-500">
                {action.description}
              </p>

              <Link
                to={action.link}
                className="mt-8 inline-flex items-center gap-2 font-medium text-purple-700 transition-all duration-300 group-hover:gap-3"
              >
                {action.button}
                <ArrowRight size={18} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
