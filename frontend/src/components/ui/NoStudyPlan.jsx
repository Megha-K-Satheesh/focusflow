import { BookOpen, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function NoStudyPlan() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 flex items-center justify-center px-6 mt-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-10 text-center">

        <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-purple-600" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mt-6">
          No Study Plan Yet
        </h1>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Create your first personalized AI study plan and receive a structured
          roadmap based on your goals, current knowledge, and available study
          time.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-10">

          <div className="border rounded-2xl p-5 bg-purple-50">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold">Personalized Goals</h3>
            <p className="text-sm text-gray-600 mt-2">
              Learn according to your career goals and skill level.
            </p>
          </div>

          <div className="border rounded-2xl p-5 bg-purple-50">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold">Daily Roadmap</h3>
            <p className="text-sm text-gray-600 mt-2">
              Stay organized with structured daily learning tasks.
            </p>
          </div>

          <div className="border rounded-2xl p-5 bg-purple-50">
            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold">AI Generated</h3>
            <p className="text-sm text-gray-600 mt-2">
              Every study plan is tailored specifically for your learning needs.
            </p>
          </div>

        </div>

        <Link
          to="/create-study-plan"
          className="inline-flex items-center justify-center mt-10 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
        >
          Create Your First Study Plan
        </Link>

      </div>
    </div>
    </>
  );
}

export default NoStudyPlan;
