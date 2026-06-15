

import {
  Brain,
  GraduationCap,
  Sparkles,
  StickyNote,
  Target
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../components/ui/Footer";
import Navbar from "../../components/ui/Navbar";
import { createStudyPlan } from "../../redux/slices/user/studyPlanSlice";
import { showError, showSuccess } from "../../utils/toast";
import { errorStyle, inputStyle } from "../../utils/uiConstants";

function CreateStudyPlan() {
  const dispatch = useDispatch();
 
  const {loading} = useSelector((state)=>state.studyPlan)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      

      await dispatch(createStudyPlan(data)).unwrap();

      showSuccess("Study plan generated successfully");
    } catch (error) {
      showError(error);
    } 
  };



  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-50 to-violet-200 py-10 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm backdrop-blur">
            <Sparkles size={16} />
            AI Powered Learning Roadmap
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-purple-900">
            Create Your Study Plan
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Tell us about your goals, experience, and learning preferences.
            We'll generate a personalized roadmap tailored to your journey.
          </p>
        </div>
        <div className="mb-8 rounded-2xl border border-purple-100 bg-white/80 px-6 py-5 shadow-sm backdrop-blur">
  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

    {/* Left Side */}
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Build your personalized study plan
      </h2>

      <p className="text-sm text-gray-500">
        Fill in a few details and AI will generate a structured roadmap for you.
      </p>
    </div>

   

  </div>
</div>
       

        {/* Form Card */}

        <div className="rounded-3xl border border-purple-100 bg-white shadow-2xl shadow-purple-100/40">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-10 space-y-10"
          >
            {/* Learning Goal */}

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Target size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Learning Goal
                  </h2>
                  <p className="text-sm text-gray-500">
                    Define what you want to achieve.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="goal"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Goal
                </label>

                <input
                  id="goal"
                  type="text"
                  placeholder="Learn MERN Stack and become job-ready"
                  className={`${inputStyle} ${
                    errors.goal
                      ? "border-red-400 focus:ring-red-100"
                      : ""
                  }`}
                  {...register("goal", {
                    required: "Goal is required",
                    minLength: {
                      value: 5,
                      message:
                        "Goal must contain at least 5 characters",
                    },
                  })}
                />

                {errors.goal && (
                  <p className={errorStyle}>
                    {errors.goal.message}
                  </p>
                )}
              </div>
            </section>

            {/* Experience & Preferences */}

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Experience Level & Study Preferences
                  </h2>

                  <p className="text-sm text-gray-500">
                    Help us customize the difficulty and pace.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Experience Level
                  </label>

                  <select
                    className={inputStyle}
                    {...register("level", {
                      required: "Level is required",
                    })}
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

                  {errors.level && (
                    <p className={errorStyle}>
                      {errors.level.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Duration (Days)
                  </label>

                  <input
                    type="number"
                    placeholder="30"
                    className={inputStyle}
                    {...register("duration", {
                      required: "Duration is required",
                      min: {
                        value: 1,
                        message:
                          "Minimum duration is 1 day",
                      },
                      max: {
                        value: 365,
                        message:
                          "Maximum duration is 365 days",
                      },
                    })}
                  />

                  {errors.duration && (
                    <p className={errorStyle}>
                      {errors.duration.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Daily Study Hours
                  </label>

                  <input
                    type="number"
                    placeholder="2"
                    className={inputStyle}
                    {...register("dailyHours", {
                      required:
                        "Daily study hours is required",
                    })}
                  />

                  {errors.dailyHours && (
                    <p className={errorStyle}>
                      {errors.dailyHours.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Target Outcome
                  </label>

                  <input
                    type="text"
                    placeholder="Job, Internship, Interview Preparation"
                    className={inputStyle}
                    {...register("targetOutcome")}
                  />
                </div>
              </div>
            </section>

            {/* Learning Background */}

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Brain size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Learning Background
                  </h2>

                  <p className="text-sm text-gray-500">
                    Share your strengths and challenges.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Knowledge
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Describe what you already know..."
                    className={inputStyle}
                    {...register("currentKnowledge")}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Weak Areas
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Topics you struggle with..."
                    className={inputStyle}
                    {...register("weakAreas")}
                  />
                </div>
              </div>
            </section>

            {/* Notes */}

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <StickyNote size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Additional Notes
                  </h2>

                  <p className="text-sm text-gray-500">
                    Optional information for better planning.
                  </p>
                </div>
              </div>

              <textarea
                rows={5}
                placeholder="Anything else the AI should know?"
                className={inputStyle}
                {...register("notes")}
              />
            </section>

            {/* Submit */}

            <div className="border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-violet-600
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-purple-300/30
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading
                  ? "Generating Your Study Plan..."
                  : "Generate Study Plan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default CreateStudyPlan;
