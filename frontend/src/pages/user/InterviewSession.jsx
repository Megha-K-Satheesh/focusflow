
import {
  ArrowRight,
  Mic,
  MicOff,
  Save,
  Send,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMediaRecorder } from "../../hooks/useMediaRecorder";
import {
  getInterview,
  getNextQuestion,
  transcribeAudio,
} from "../../redux/slices/user/interviewSlice";

function InterviewSession() {
  const dispatch = useDispatch();
  const { interviewId } = useParams();

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

  const onSubmit = (data) => {
    console.log("Final Answer:", data.answer);
  };

  const handleNextQuestion = () => {
    dispatch(getNextQuestion(interviewId));
    setValue("answer", "");
      clearRecording();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-violet-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-purple-100 rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-purple-800">
                AI Interview Session
              </h1>

              <p className="text-gray-500 mt-1">
                Practice and improve your interview skills
              </p>
            </div>

            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold">
                Question {questionNumber || 1} of{" "}
                {totalQuestions || 1}
              </div>

              <div className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold">
                {currentQuestion?.topic ||
                  "Interview"}
              </div>
            </div>
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
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-medium transition"
              >
                <Mic size={18} />
                Start Recording
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition"
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
            className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            placeholder="Speak or type your answer here..."
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={loading}
              className="flex items-center gap-2 border border-purple-200 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition disabled:opacity-50"
            >
              <ArrowRight size={18} />
              Next Question
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              <Send size={18} />
              Submit Answer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InterviewSession;
