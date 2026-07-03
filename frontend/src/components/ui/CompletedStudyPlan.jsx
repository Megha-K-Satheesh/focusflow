import { Award, Brain, CheckCircle2, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function CompletedStudyPlan() {
  const { studyPlan } = useSelector((state) => state.studyPlan);

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 flex items-center justify-center px-6 mt-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-10">

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mt-6">
          Study Plan Completed!
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Congratulations! You've successfully completed your study plan.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-10">

          <div className="bg-purple-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Plan</p>
            <h3 className="font-semibold mt-1">{studyPlan?.title}</h3>
          </div>

          <div className="bg-purple-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Goal</p>
            <h3 className="font-semibold mt-1">{studyPlan?.goal}</h3>
          </div>

          <div className="bg-purple-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Duration</p>
            <h3 className="font-semibold mt-1">
              {studyPlan?.duration} Days
            </h3>
          </div>

        </div>

        <div className="mt-10 space-y-4">

          <Link
            to="/create-study-plan"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Create Another Study Plan
          </Link>

          <Link
            to="/interview-start"
            className="w-full border border-purple-200 text-purple-700 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-50"
          >
            <Brain size={20} />
            Start AI Interview
          </Link>

        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 flex gap-3">
          <Award className="text-green-600" />
          <div>
            <h3 className="font-semibold text-green-700">
              Great work!
            </h3>
            <p className="text-green-700 mt-2">
              You've completed your learning roadmap. Keep improving by taking
              AI interviews or generating a new personalized study plan.
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default CompletedStudyPlan;
