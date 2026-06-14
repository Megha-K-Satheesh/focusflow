import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";
import studyPlanReducer from "./slices/user/studyPlanSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    studyPlan:studyPlanReducer
  },
});
