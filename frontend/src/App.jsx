import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import Register from './pages/auth/Register';
import VerifyOtp from "./pages/auth/VerifyOtp";
import Home from "./pages/user/Home";
function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
    </Routes>
          <ToastContainer />
    </>
  )
}

export default App
