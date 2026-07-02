
import {
  ArrowLeft,
  ArrowRight,
  Mic,
  MicOff,
  Save,
  Send
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../../components/ui/CodeEditor";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useMediaRecorder } from "../../hooks/useMediaRecorder";
import {
  getInterview,
  getNextQuestion,
  getPreviousQuestion,
  submitAnswer,
  transcribeAudio
} from "../../redux/slices/user/interviewSlice";
import { showError, showSuccess } from "../../utils/toast";
function InterviewSession() {
  const dispatch = useDispatch();
  const { interviewId } = useParams();
  const [code,setCode] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      answer: "",
    },
  });

  const {
    currentQuestion,
    totalQuestions,
    questionNumber,
    transcript,
    loading,
    error: transcriptionError,
  } = useSelector((state) => state.interview);
const isSubmitted = currentQuestion?.submitted;
const status = currentQuestion?.status;
const isLastQuestion = questionNumber >= totalQuestions;
const isEvaluated = status === "evaluated";
const isAnswered = status === "answered";

const isLocked = isSubmitted || isEvaluated;


  const {
    isRecording,
    audioBlob,
    audioUrl,
    error,
    startRecording,
    stopRecording,
    clearRecording
  } = useMediaRecorder();


  useEffect(() => {
    if (interviewId) {
      dispatch(getInterview(interviewId));
    }
  }, [dispatch, interviewId]);


  useEffect(() => {
    if (!audioBlob) return;

    dispatch(transcribeAudio(audioBlob));
  }, [audioBlob, dispatch]);

  
  useEffect(() => {
    if (transcript) {
      setValue("answer", transcript);
    }
  }, [transcript, setValue]);


const onSubmit = async (data) => {
  if (currentQuestion?.type === "coding" && !code?.trim()) {
    showError("Code is required for coding questions");
    return;
  }

  try {
    await dispatch(
      submitAnswer({
        interviewId,
        data: {
          answer: data.answer || "",
          code: code || "",
          language: currentQuestion?.language || "javascript",
        },
      })
    ).unwrap();

    showSuccess("Answer submitted successfully");
     await dispatch(getInterview(interviewId)).unwrap();
      setValue("answer", "");
    setCode("");
    clearRecording();
  } catch (err) {
    showError(err || "Submit failed");
  }
};


  const handleNextQuestion = () => {
    dispatch(getNextQuestion(interviewId));
    setValue("answer", "");
      setCode("");
      clearRecording();
  };

const handlePreviousQuestion = () => {
  dispatch(getPreviousQuestion(interviewId));
  setValue("answer", "");
    setCode("");
  clearRecording();
};


const navigate = useNavigate();

const handleCompleteInterview = () => {
  navigate(`/interview/${interviewId}/feedback`);
};

if (loading) {
  return <LoadingSpinner />;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-violet-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        
<div className="bg-white border border-purple-100 rounded-2xl shadow-sm p-5 mb-6 space-y-4">


  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

 
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
        AI Interview Session
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Practice and improve your interview skills
      </p>
    </div>

   
    <div className="flex gap-3 flex-wrap">
      <div className="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 text-sm font-medium">
        Question {questionNumber || 1} / {totalQuestions || 1}
      </div>

      <div className="px-3 py-1 rounded-lg bg-violet-100 text-violet-700 text-sm font-medium">
        {currentQuestion?.topic || "Interview"}
      </div>
    </div>
  </div>

  <div className="flex gap-2 flex-wrap text-xs">

    {!isSubmitted && (
      <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
        Not Submitted
      </span>
    )}

    {isSubmitted && isAnswered && !isEvaluated && (
      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
        Submitted
      </span>
    )}

    {isEvaluated && (
      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
        Evaluated
      </span>
    )}

  </div>

</div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isRecording
                  ? "bg-red-500 animate-pulse"
                  : "bg-gray-400"
              }`}
            />

            <span className="text-sm font-medium text-gray-700">
              {isRecording
                ? "Recording..."
                : "Not Recording"}
            </span>
          </div>
        </div>

        <div className="bg-white border border-purple-100 rounded-3xl shadow-lg p-6 mb-6">
          <div className="text-sm text-purple-600 font-semibold mb-3">
            {currentQuestion?.type?.toUpperCase() ||
              "QUESTION"}
          </div>

          <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
            {currentQuestion?.question ||
              "Loading question..."}
          </h2>
        </div>

        <div className="bg-white border border-purple-100 rounded-3xl shadow-lg p-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>
    {!isRecording ? (
      <button
        type="button"
        onClick={startRecording}
        disabled={isLocked}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition
          ${isLocked 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-green-500 hover:bg-green-600 text-white"
          }
        `}
      >
        <Mic size={18} />
        Start Recording
      </button>
    ) : (
      <button
        type="button"
        onClick={stopRecording}
        disabled={isLocked}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition
          ${isLocked 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-red-500 hover:bg-red-600 text-white"
          }
        `}
      >
        <MicOff size={18} />
        Stop Recording
      </button>
    )}
  </div>

  <p className="text-sm text-gray-500">
    Record your answer and convert it to text automatically
  </p>
</div>

        {audioUrl && (
          <div className="bg-white border border-purple-100 rounded-3xl shadow-lg p-5 mb-6">
            <p className="font-semibold text-gray-700 mb-3">
              Recorded Audio
            </p>

            <audio
              controls
              src={audioUrl}
              className="w-full"
            />
          </div>
        )}

        {loading && (
          <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-xl mb-6">
            Converting audio to text...
          </div>
        )}

        {(error || transcriptionError) && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl mb-6">
            {error || transcriptionError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-purple-100 rounded-3xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-purple-800 text-lg">
              Your Answer
            </h3>

            <Save
              className="text-purple-500"
              size={18}
            />
          </div>

          <textarea
            {...register("answer")}
            rows={10}
            disabled={isLocked}
            className={`w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none  ${isLocked ? " cursor-not-allowed" : ""}`}
            placeholder="Speak or type your answer here..."
          />



<div className="mt-6">
  <h3 className="font-semibold text-purple-800 mb-3">
    Code 
  </h3>

  <CodeEditor
    language={currentQuestion?.language || "javascript"}
   
    value={code}
    onChange={setCode}
  readOnly={isLocked}
  />
</div>






          <div className="flex justify-between mt-5">
  <button
    type="button"
    onClick={handlePreviousQuestion}
    disabled={loading || questionNumber === 1}
    className="flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
  >
    <ArrowLeft size={18} />
    Previous
  </button>

  <div className="flex gap-3">
    <button
      type="button"
      onClick={handleNextQuestion}
       disabled={loading || isLastQuestion}
      className="flex items-center gap-2 border border-purple-200 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition disabled:opacity-50"
    >
      <ArrowRight size={18} />
      Next Question
    </button>

   
    <button
  type="submit"
  disabled={loading || isSubmitted}
  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition 
    ${isSubmitted 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
      : "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:opacity-90"
    }`}
>
  <Send size={18} />
  {isSubmitted ? "Submitted" : "Submit Answer"}
</button>


{isLastQuestion && (
    <button
      type="button"
      onClick={handleCompleteInterview}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition"
    >
       Complete & Get Feedback
    </button>
  )}
  </div>
</div>
        </form>
      </div>
    </div>
  );
}

export default InterviewSession;

