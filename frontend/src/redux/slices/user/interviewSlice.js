import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { interviewService } from "../../../services/interviewService";

const initialState = {
  loading: false,
  error: null,

  interviewId: null,

  currentQuestion: null,

  questionNumber: 0,

  totalQuestions: 0,

  transcript: "",

  score: null,

  feedback: null,
};

export const startInterview = createAsyncThunk(
  "interview/startInterview",
  async (data, thunkAPI) => {
    try {
      const response =
        await interviewService.startInterview(
          data
        );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to start interview"
      );
    }
  }
);

export const getInterview = createAsyncThunk(
  "interview/getInterview",
  async (interviewId, thunkAPI) => {
    try {
      const response =
        await interviewService.getInterview(
          interviewId
        );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch interview"
      );
    }
  }
);

export const getNextQuestion =
  createAsyncThunk(
    "interview/getNextQuestion",
    async (interviewId, thunkAPI) => {
      try {
        const response =
          await interviewService.getNextQuestion(
            interviewId
          );

        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch next question"
        );
      }
    }
  );

export const transcribeAudio = createAsyncThunk(
  "interview/transcribeAudio",
  async (audioBlob, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append(
        "audio",
        audioBlob,
        "recording.webm"
      );

      const response =
        await interviewService.transcribeAudio(
          formData
        );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to transcribe audio"
      );
    }
  }
);

export const getPreviousQuestion =
  createAsyncThunk(
    "interview/getPreviousQuestion",
    async (interviewId, thunkAPI) => {
      try {
        const response =
          await interviewService.getPreviousQuestion(
            interviewId
          );

        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch previous question"
        );
      }
    }
  );
export const submitAnswer = createAsyncThunk(
  "interview/submitAnswer",
  async ({ interviewId, data }, thunkAPI) => {
    try {
      const response =
        await interviewService.submitAnswer(
          interviewId,
          data
        );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to submit answer"
      );
    }
  }
);


const interviewSlice = createSlice({
  name: "interview",
  initialState,

  reducers: {
    clearTranscript: (state) => {
      state.transcript = "";
    },

    clearInterview: (state) => {
      state.interviewId = null;
      state.currentQuestion = null;
      state.questionNumber = 0;
      state.totalQuestions = 0;
      state.transcript = "";
      state.score = null;
      state.feedback = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

     
      .addCase(
        startInterview.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        startInterview.fulfilled,
        (state, action) => {
          state.loading = false;

          state.interviewId =
            action.payload.interviewId;

          state.currentQuestion =
            action.payload.currentQuestion;

          state.questionNumber =
            action.payload.questionNumber;

          state.totalQuestions =
            action.payload.totalQuestions;
        }
      )

      .addCase(
        startInterview.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(
  getInterview.pending,
  (state) => {
    state.loading = true;
    state.error = null;
  }
)

.addCase(
  getInterview.fulfilled,
  (state, action) => {
    state.loading = false;

    state.interviewId =
      action.payload.interviewId;

    state.currentQuestion =
      action.payload.currentQuestion;

    state.questionNumber =
      action.payload.questionNumber;

    state.totalQuestions =
      action.payload.totalQuestions;
  }
)

.addCase(
  getInterview.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
)

.addCase(
  getNextQuestion.pending,
  (state) => {
    state.loading = true;
    state.error = null;
  }
)

.addCase(
  getNextQuestion.fulfilled,
  (state, action) => {
    state.loading = false;

    if (action.payload.completed) {
      state.currentQuestion = null;
      return;
    }

    state.currentQuestion =
      action.payload.currentQuestion;

    state.questionNumber =
      action.payload.questionNumber;

    state.totalQuestions =
      action.payload.totalQuestions;
  }
)

.addCase(
  getNextQuestion.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
)
 
      .addCase(
        transcribeAudio.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        transcribeAudio.fulfilled,
        (state, action) => {
          state.loading = false;

          state.transcript =
            action.payload.transcript;
        }
      )

      .addCase(
        transcribeAudio.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(
  getPreviousQuestion.pending,
  (state) => {
    state.loading = true;
    state.error = null;
  }
)

.addCase(
  getPreviousQuestion.fulfilled,
  (state, action) => {
    state.loading = false;

    state.currentQuestion =
      action.payload.currentQuestion;

    state.questionNumber =
      action.payload.questionNumber;

    state.totalQuestions =
      action.payload.totalQuestions;
  }
)

.addCase(
  getPreviousQuestion.rejected,
  (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
)

.addCase(submitAnswer.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(submitAnswer.fulfilled, (state, action) => {
  state.loading = false;

  
  state.currentQuestion = action.payload.currentQuestion;
})

.addCase(submitAnswer.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  },
});

export const {
  clearTranscript,
  clearInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
