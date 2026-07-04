
import {
  ChartColumnIncreasing,
  Code2,
  Target,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import { startInterview } from "../../redux/slices/user/interviewSlice";
import { errorStyle } from "../../utils/uiConstants";
function InterviewStart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.interview
  );

  const {
    register,
    handleSubmit,
    watch,
      formState: { errors },
  } = useForm({
    defaultValues: {
      interviewType: "custom",
      role: "",
      level: "Intermediate",
      mode: "mixed",
      questionCount: 10,
    },
  });

  const interviewType = watch("interviewType");

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        startInterview(data)
      ).unwrap();

      navigate(
        `/interview-session/${result.interviewId}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-50 to-violet-200 flex items-center justify-center px-4 py-10 mt-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            AI Mock Interview
          </h1>

          <p className="text-purple-100 mt-2">
            Practice technical interviews with AI
          </p>
        </div>

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Interview Type
              </label>

              <select
                {...register("interviewType")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="custom">
                  Custom Interview
                </option>
                <option value="study-plan">
                  Study Plan Interview
                </option>
              </select>
            </div>

            {interviewType === "custom" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Role
                </label>

                <input
                  type="text"
                  placeholder="MERN Stack Developer"
                  {...register("role" ,{
                    validate: (value) =>
                      interviewType === "study-plan" ||
                      value.trim().length >= 3 ||
                      "Role must contain at least 3 characters",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                      {errors.role && (
                      <p className={errorStyle}>
                        {errors.role.message}
                      </p>
                    )}
                    </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Difficulty Level
              </label>

              <select
                {...register("level")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Beginner">
                  Beginner
                </option>
                <option value="Intermediate">
                  Intermediate
                </option>
                <option value="Advanced">
                  Advanced
                </option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Interview Mode
              </label>

              <select
                {...register("mode")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="theory">
                  Theory
                </option>
                <option value="coding">
                  Coding
                </option>
                <option value="mixed">
                  Mixed
                </option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Number of Questions
              </label>

              <input
                type="number"
                min="1"
                max="20"
                {...register("questionCount", {
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Minimum is 1 question",
                  },
                  max: {
                    value: 20,
                    message: "Maximum is 20 questions",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
                            {errors.questionCount && (
                <p className={errorStyle} >
                  {errors.questionCount.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">
                  <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  </div>

                <h3 className="font-semibold text-purple-800">
                  AI Questions
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Dynamic interview questions
                </p>
              </div>

              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2"><Code2 className="w-8 h-8 mx-auto mb-2 text-violet-600" /></div>

                <h3 className="font-semibold text-violet-800">
                  Coding Round
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Real coding challenges
                </p>
              </div>

              <div className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2"><ChartColumnIncreasing className="w-8 h-8 mx-auto mb-2 text-fuchsia-600" /></div>

                <h3 className="font-semibold text-fuchsia-800">
                  AI Feedback
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Detailed performance report
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Creating Interview..."
                : "Start Interview "}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default InterviewStart;
