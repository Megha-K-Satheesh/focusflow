import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { dashboardService } from "../../../services/dashboardService";

const initialState = {
  loading: false,
  error: null,

  studyPlan: null,
  activeInterview: null,
  stats: null,
  recentInterviews: [],
};

export const getDashboard = createAsyncThunk(
  "dashboard/getDashboard",
  async (_, thunkAPI) => {
    try {
      const response =
        await dashboardService.getDashboard();

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        getDashboard.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getDashboard.fulfilled,
        (state, action) => {
          state.loading = false;

          state.studyPlan =
            action.payload.studyPlan;

          state.activeInterview =
            action.payload.activeInterview;

          state.stats =
            action.payload.stats;

          state.recentInterviews =
            action.payload.recentInterviews;
        }
      )

      .addCase(
        getDashboard.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default dashboardSlice.reducer;
