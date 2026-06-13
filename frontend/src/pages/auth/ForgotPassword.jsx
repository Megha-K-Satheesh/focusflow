import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/slices/user/authSlice";
import { showError, showSuccess } from "../../utils/toast";
function ForgotPassword() {

  
  const navigate = useNavigate();
  const {loading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
     

     
     await dispatch(forgotPassword(data)).unwrap()

         

    showSuccess("Reset link sent to your email");
       navigate("/verify-reset-password-otp", { replace: true });
    } catch (error) {
      showError(error);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-50 to-violet-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-purple-100">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          
          <div className="mt-2 text-center text-lg text-text-muted">
                        Remember the Password?{" "}
                        <Link
                          to="/login"
                          className="text-primary  font-medium hover:underline"
                        >
                          Sign In
                        </Link>
                    </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
