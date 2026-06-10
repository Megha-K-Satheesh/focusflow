import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/user/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
