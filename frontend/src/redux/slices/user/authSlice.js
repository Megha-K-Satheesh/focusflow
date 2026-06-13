
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
      const response = await authService.verifyOtp(data);
     
      return response.data.data;
    } catch (err) {
        

      return thunkAPI.rejectWithValue(err.response?.data?.error?.message || 'Invalid or expired OTP');
    }
  }
);

export const login = createAsyncThunk("auth/login",
  async(data,thunkAPI)=>{
    try {
      const response = await authService.login(data)
       return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login falied')
    }
  })
  export const forgotPassword = createAsyncThunk("auth/forgotPassword",async(data,thunkAPI)=>{
    try {
          const response = await authService.forgotPassword(data)
          return response.data.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Forgot password failed")
    }
  })
export const verifyResetPasswordOtp = createAsyncThunk("auth/verifyResetPasswordOtp",async(data,thunkAPI)=>{
  try {
        const response = await authService.verifyResetPasswordOtp(data);
        return response.data.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message ||"VerifyResetPasswordOtp is falied")
  }
})
export const resetPassword = createAsyncThunk("auth/resetPassword",async(data,thunkAPI)=>{
  try {
      const response = await authService.resetPassword(data);
      return response.data.data
  } catch (err) {
     return thunkAPI.rejectWithValue(err.response?.data?.message ||"ResetPassword is falied")
  }
})


export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data, thunkAPI) => {
    try {
      const response = await authService.resendOtp(data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to resend OTP"
      );
    }
  }
);


const token = localStorage.getItem('token')
const initialState = {
  user: null,
  userId: localStorage.getItem("otpUserId") || null,
  isOtpSent: false,
  loading: false,
 resendLoading: false,
  error: null,
  isAuthenticated:!!token
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       
       
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
      state.error = null
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
      state.error = null;
      state.user = action.payload.user;
      state.userId = null;
      state.isOtpSent = false;

      localStorage.removeItem("otpUserId");
    })

    .addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(login.pending,(state)=>{
      state.loading = true;
      state.error = null
    })
    .addCase(login.fulfilled,(state,action)=>{
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("token",action.payload.token)
    })
    .addCase(login.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;

    })
    .addCase(forgotPassword.pending,(state)=>{
       state.loading = true;
       state.error = null;
    })
    .addCase(forgotPassword.fulfilled,(state,action)=>{
      state.loading  = false;
      state.error = null;
      state.userId = action.payload.user;

      if(action.payload.user){
         localStorage.setItem('resetOtpUserId',action.payload.user)
      }
    })
    .addCase(forgotPassword.rejected,(state,action)=>{
      state.loading  = false;
      state.error  = action.payload;
    })
    .addCase(verifyResetPasswordOtp.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(verifyResetPasswordOtp.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        if(action.payload.resetToken){
          localStorage.setItem("resetToken",action.payload.resetToken)
        }
       
    })
    .addCase(verifyResetPasswordOtp.rejected,(state,action)=>{
       state.loading = false;
        state.error = action.payload;
    })
    .addCase(resetPassword.pending,(state)=>{
       state.loading = true;
       state.error = null
    })
    .addCase(resetPassword.fulfilled,(state)=>{
       state.loading = false;
       state.error = null;
       localStorage.removeItem('resetToken')
        localStorage.removeItem("resetOtpUserId");
    })
    .addCase(resetPassword.rejected,(state,action)=>{
       state.loading = false;
       state.error = action.payload
    })
    .addCase(resendOtp.pending, (state) => {
        state.resendLoading = true;
        state.error = null;
      })

      .addCase(resendOtp.fulfilled, (state) => {
        state.resendLoading = false;
        state.error = null;
      })

      .addCase(resendOtp.rejected, (state, action) => {
        
        state.resendLoading = false;
        state.error = action.payload;
      })
}
})
export const {  logout } = authSlice.actions;
export default authSlice.reducer
