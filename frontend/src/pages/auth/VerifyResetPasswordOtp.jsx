import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyResetPasswordOtp } from "../../redux/slices/user/authSlice";
import { showError, showSuccess } from "../../utils/toast";

function ResetPasswordOtp() {
  const dispatch = useDispatch();
 const navigate = useNavigate()
 const { loading,  resendLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const userId =localStorage.getItem("resetOtpUserId");

  const onSubmit = async (data) => {
    try {
      await dispatch(
        verifyResetPasswordOtp({
          userId,
          otp: data.otp,
          purpose: "PASSWORD_RESET"
        })
      ).unwrap();

      showSuccess("OTP Verified Successfully");
      navigate('/reset-password',{replace:true})
    } catch (err) {
      showError(err);
    }
  };

const handleResendOtp = async () => {
  try {
     
    await dispatch(
      
      resendOtp({
        userId,
        purpose: "PASSWORD_RESET",
      })
    ).unwrap();

    showSuccess("OTP sent successfully");
  } catch (error) {
    showError(error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-50 to-violet-200 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-purple-100 text-center">

        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Reset Password OTP
        </h1>

        <p className="text-gray-500 mb-6">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            placeholder="Enter OTP"
            maxLength={6}
            inputMode="numeric"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5 text-center tracking-widest"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP must be exactly 6 digits"
              }
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />

          {errors.otp && (
            <p className="text-red-500 text-sm mb-4">
              {errors.otp.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive OTP?{" "}
          <button
          type="button"
          onClick={handleResendOtp}
          className="text-purple-600 font-medium hover:underline">
              {resendLoading ? "Sending..." : "Resend"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default ResetPasswordOtp;
