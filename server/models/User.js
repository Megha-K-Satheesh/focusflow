import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

   otpDetails: {
        code: {
          type: String
        },
        expiresAt: {
          type: Date
        },
        purpose: {
          type: String,
          enum: ['EMAIL_VERIFICATION', 'PASSWORD_RESET']
        }
},
},{
  timestamps:true
}

)

userSchema.pre('save', async function () {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  if (this.isModified('otpDetails.code') && this.otpDetails?.code) {
    this.otpDetails.code = await bcrypt.hash(this.otpDetails.code, 12);
  }
});
userSchema.methods.compareOtp = async function (candidateOtp) {
  return await bcrypt.compare(candidateOtp, this.otpDetails.code);
};



userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};
const User = new mongoose.model("User",userSchema);
export default User
