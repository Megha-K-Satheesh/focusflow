// import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import './App.css';
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import Login from "./pages/auth/Login";
// import Register from './pages/auth/Register';
// import ResetPassword from "./pages/auth/ResetPassword";
// import VerifyOtp from "./pages/auth/VerifyOtp";
// import ResetPasswordOtp from "./pages/auth/VerifyResetPasswordOtp";
// import CreateStudyPlan from "./pages/user/CreateStudyPlan";
// import Home from "./pages/user/Home";
// import InterviewFeedback from "./pages/user/InterviewFeedback";
// import InterviewHistory from "./pages/user/InterviewHistory";
// import InterviewSession from "./pages/user/InterviewSession";
// import InterviewStart from "./pages/user/InterviewStart";
// import LandingPage from "./pages/user/LandingPage";
// import ViewStudyPlan from "./pages/user/ViewStudyPlan";
// import AboutPage from "./pages/user/AboutPage";
// function App() {


//   return (
//     <>
//      <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/verify-otp" element={<VerifyOtp />} />
//       <Route path="/login" element={<Login/>} />
//       <Route path="/forgot-password" element={<ForgotPassword/>} />
//       <Route path="/verify-reset-password-otp" element={<ResetPasswordOtp/>} />
//       <Route path="/reset-password" element={<ResetPassword/>} />
//       <Route path="/create-study-plan" element={<CreateStudyPlan/>} />
//       <Route path="/view-study-plan"  element={<ViewStudyPlan/>} />
//       <Route path="/interview-start"  element={<InterviewStart/>} />
//       <Route  path="/interview-session/:interviewId"  element={<InterviewSession/>} />
//      <Route path="/interview/:interviewId/feedback" element={<InterviewFeedback />}/>
    
//      <Route path="/interview-history" element = {<InterviewHistory/>}/>
//      <Route path="/landing-page" element = {<LandingPage/>}/>
//      <Route path="/about" element = {<AboutPage />}/>


// </Routes>
//           <ToastContainer />
//     </>
//   )
// }

// export default App




import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoadingSpinner from "./components/ui/LoadingSpinner";

import "./App.css";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import PublicRoute from "./components/ui/PublicRoute";

const Home = lazy(() => import("./pages/user/Home"));
const LandingPage = lazy(() => import("./pages/user/LandingPage"));
const AboutPage = lazy(() => import("./pages/user/AboutPage"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VerifyOtp = lazy(() => import("./pages/auth/VerifyOtp"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPasswordOtp = lazy(() =>
  import("./pages/auth/VerifyResetPasswordOtp")
);
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const CreateStudyPlan = lazy(() =>
  import("./pages/user/CreateStudyPlan")
);
const ViewStudyPlan = lazy(() =>
  import("./pages/user/ViewStudyPlan")
);
const InterviewStart = lazy(() =>
  import("./pages/user/InterviewStart")
);
const InterviewSession = lazy(() =>
  import("./pages/user/InterviewSession")
);
const InterviewFeedback = lazy(() =>
  import("./pages/user/InterviewFeedback")
);
const InterviewHistory = lazy(() =>
  import("./pages/user/InterviewHistory")
);

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

         

          {/* PublicRoute */}
          <Route element={<PublicRoute />}>
          <Route path="/landing-page" element={<LandingPage />} />
      
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/verify-reset-password-otp"
              element={<ResetPasswordOtp />}
            />
            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />
          </Route>

          {/* Protected Pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/create-study-plan"
              element={<CreateStudyPlan />}
            />

            <Route
              path="/view-study-plan"
              element={<ViewStudyPlan />}
            />

            <Route
              path="/interview-start"
              element={<InterviewStart />}
            />

            <Route
              path="/interview-session/:interviewId"
              element={<InterviewSession />}
            />

            <Route
              path="/interview/:interviewId/feedback"
              element={<InterviewFeedback />}
            />

            <Route
              path="/interview-history"
              element={<InterviewHistory />}
            />
            <Route path="/about" 
            element={<AboutPage />} />
          </Route>

        </Routes>
      </Suspense>

      <ToastContainer />
    </>
  );
}

export default App;
