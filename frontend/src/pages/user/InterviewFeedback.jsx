
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFeedback
} from "../../redux/slices/user/interviewSlice";

import {
  AlertCircle,
  Award,
  Brain,
  FileText,
  Target,
  ThumbsUp,
  TrendingUp
} from "lucide-react";
import Navbar from "../../components/ui/Navbar";

function InterviewFeedback() {
  const dispatch = useDispatch();
  const { interviewId } = useParams();

  const { feedbackData, feedbackLoading } = useSelector(
    (state) => state.interview
  );

  useEffect(() => {
    if (interviewId) {
      dispatch(getFeedback(interviewId));
    }
  }, [dispatch, interviewId]);

  if (feedbackLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100">
        <div className="text-purple-700 font-semibold animate-pulse">
          Generating your interview insights...
        </div>
      </div>
    );
  }

  const score = feedbackData?.summary?.overallScore || 0;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto">

       
        <div className="bg-white shadow-md rounded-2xl p-6 border border-purple-100">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
            <Brain className="text-purple-600" />
            Interview Feedback Report
          </h1>

          <p className="text-gray-500 mt-1">
            Personalized AI analysis of your interview performance
          </p>
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">


  <div className="relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-600 to-violet-600 p-6 text-white shadow-md">
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-white/90">
        <Award size={18} />
        <span className="text-sm font-medium">Overall Score</span>
      </div>
    </div>

    <div className="mt-4">
      <p className="text-5xl font-bold leading-none">
        {score}
        <span className="text-xl font-medium opacity-80">/10</span>
      </p>

      <p className="mt-2 text-sm text-white/80">
        {feedbackData?.summary?.performanceLevel}
      </p>
    </div>

    <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
  </div>

 
  <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    
    <div className="flex items-center gap-2 text-purple-700">
      <Target size={18} />
      <span className="text-sm font-medium">Total Questions</span>
    </div>

    <p className="mt-4 text-4xl font-bold text-gray-900">
      {feedbackData?.summary?.totalQuestions}
    </p>

    <p className="mt-1 text-xs text-gray-500">
      Questions generated in this session
    </p>
  </div>


  <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    
    <div className="flex items-center gap-2 text-purple-700">
      <TrendingUp size={18} />
      <span className="text-sm font-medium">Evaluated</span>
    </div>

    <p className="mt-4 text-4xl font-bold text-gray-900">
      {feedbackData?.summary?.evaluatedQuestions}
    </p>

    <p className="mt-1 text-xs text-gray-500">
      Answers analyzed successfully
    </p>
  </div>

</div>

        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-8">

       
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <h2 className="text-lg font-bold text-green-600 flex items-center gap-2">
              <ThumbsUp />
              Strengths
            </h2>

            <ul className="mt-4 space-y-2">
              {feedbackData?.insights?.strengths?.length ? (
                feedbackData.insights.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm"
                  >
                    {s}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No strengths found</p>
              )}
            </ul>
          </div>

      
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <h2 className="text-lg font-bold text-red-500 flex items-center gap-2">
              <AlertCircle />
              Improvements
            </h2>

            <ul className="mt-4 space-y-2">
              {feedbackData?.insights?.improvements?.length ? (
                feedbackData.insights.improvements.map((item, i) => (
                  <li
                    key={i}
                    className="bg-red-50 text-red-800 px-3 py-2 rounded-lg text-sm"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No improvements found</p>
              )}
            </ul>
          </div>

        </div>

       
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
          <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2">
            <FileText />
            Question Review
          </h2>

          <div className="mt-4 space-y-4">
            {feedbackData?.questions?.map((q, i) => (
              <div
                key={q.questionId}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Q{i + 1}
                  </h3>
                  <span className="text-purple-600 font-bold">
                    {q.score}/10
                  </span>
                </div>

                <p className="text-gray-700 mt-2">
                  {q.question}
                </p>

                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Answer:</span>{" "}
                    {q.answer || "No answer"}
                  </p>

                  {q.feedback && (
                    <p className="mt-1 text-purple-700">
                      {q.feedback}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
    </>
  );
}

export default InterviewFeedback;



