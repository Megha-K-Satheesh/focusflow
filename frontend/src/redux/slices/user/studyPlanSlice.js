import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studyPlanService } from "../../../services/studyPlanService";

export const createStudyPlan = createAsyncThunk(
  "studyPlan/createStudyPlan",
  async (data, thunkAPI) => {
    try {
      const response = await studyPlanService.createStudyPlan(data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create study plan"
      );
    }
  }
);
export const getStudyPlan = createAsyncThunk(
  "studyPlan/getStudyPlan",
  async (_, thunkAPI) => {
    try {
      const response = await studyPlanService.getStudyPlan();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch study plan"
      );
    }
  }
);

export const markTaskCompleted = createAsyncThunk(
  "studyPlan/markTaskCompleted",
  async (taskId, thunkAPI) => {
    try {
      const response = await studyPlanService.markTaskCompleted(taskId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to mark task completed"
      );
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  studyPlan: null,
  progress: 0,
  completedTasks: 0,
  totalTasks: 0,
};

const studyPlanSlice = createSlice({
  name: "studyPlan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudyPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudyPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.studyPlan = action.payload;
      })
      .addCase(createStudyPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(getStudyPlan.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getStudyPlan.fulfilled, (state, action) => {
      state.loading = false;
    
       state.studyPlan = action.payload.studyPlan;
  state.progress = action.payload.progress;
  state.completedTasks = action.payload.completedTasks;
  state.totalTasks = action.payload.totalTasks;
    })
    .addCase(getStudyPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      .addCase(markTaskCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markTaskCompleted.fulfilled, (state,action) => {
        state.loading = false;

  state.studyPlan = action.payload.studyPlan;
  state.progress = action.payload.progress;
  state.completedTasks = action.payload.completedTasks;
  state.totalTasks = action.payload.totalTasks;
       
      })
      .addCase(markTaskCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default studyPlanSlice.reducer;
