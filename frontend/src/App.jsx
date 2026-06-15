import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPasswordOtp from "./pages/auth/VerifyResetPasswordOtp";
import CreateStudyPlan from "./pages/user/CreateStudyPlan";
import Home from "./pages/user/Home";
import ViewStudyPlan from "./pages/user/ViewStudyPlan";
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
      <Route path="/create-study-plan" element={<CreateStudyPlan/>} />
      <Route path="/view-study-plan"  element={<ViewStudyPlan/>} />
     
    </Routes>
          <ToastContainer />
    </>
  )
}

export default App
