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

const initialState = {
  studyPlan: null,
  loading: false,
  error: null,
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
      });
  },
});

export default studyPlanSlice.reducer;
