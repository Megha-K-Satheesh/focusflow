
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../../../services/authService';


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  }
);


export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data, thunkAPI) => {
    try {
      const res = await authService.verifyOtp(data);
     
      return res.data.data;
    } catch (err) {
        

      return thunkAPI.rejectWithValue(err.response?.data?.error?.message || 'Invalid or expired OTP');
    }
  }
);



const initialState = {
  user: null,
  userId: localStorage.getItem("otpUserId") || null,
  isOtpSent: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action)=>{
        state.user = action.payload;
        state.isLoggedIn = true
       },
       logout:(state)=>{
        state.user = null,
        state.isLoggedIn= false
       }
    },
    extraReducers: (builder) => {
  builder


    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isOtpSent = true;
      state.userId = action.payload.userId || null;

      if (state.userId) {
        localStorage.setItem("otpUserId", state.userId);
      }
    })

    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

 
    .addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.userId = null;
      state.isOtpSent = false;

      localStorage.removeItem("otpUserId");
    })

    .addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer
