import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPasswordOtp from "./pages/auth/VerifyResetPasswordOtp";
import Home from "./pages/user/Home";
import ResetPassword from "./pages/auth/ResetPassword";
function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/verify-reset-password-otp" element={<ResetPasswordOtp/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>
          <ToastContainer />
    </>
  )
}

export default App
