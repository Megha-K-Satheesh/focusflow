import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/user/authSlice";
import { showError, showSuccess } from "../../utils/toast";

function Login() {
const [showPassword, setShowPassword] = useState(false);
const dispatch = useDispatch()
const navigate = useNavigate()
const {loading ,isAuthenticated} = useSelector((state)=>state.auth)
const {
register,
handleSubmit,
formState: { errors },
} = useForm();

const onSubmit =async (data) => {
  try {
    
    await dispatch(login(data)).unwrap()
     showSuccess("Login successful");
    navigate("/dashboard",{replace:true})
    

  } catch (error) {
    showError(error)
  }
};

if (isAuthenticated) {
  return <Navigate to="/dashboard" replace />;
}
return (
<> <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-50 to-violet-200 px-4"> <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-purple-100"> <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">
Welcome Back </h1>

      <p className="text-center text-gray-500 mb-8">
        Login to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link to='/forgot-password'>
          <button
            type="button"
            className="text-sm text-purple-600 hover:underline"
          >
            Forgot Password?
          </button>
          </Link>
        </div>
         
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300"
        >
            {loading ? "Logging in..." : "Login"}
        </button>
       
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
           <Link to ='/register'>
        <button
          type="button"
          className="text-purple-600 font-medium hover:underline"
        >
          Sing Up
        </button>
           </Link>
      </p>
    </div>
  </div>
</>


);
}

export default Login;
