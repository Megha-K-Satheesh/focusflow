import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";
import dashboardReducer from "./slices/user/dashboardSlice";
import interviewReducer from "./slices/user/interviewSlice";
import studyPlanReducer from "./slices/user/studyPlanSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    studyPlan:studyPlanReducer,
    interview:interviewReducer,
    dashboard:dashboardReducer,
  },
});
