 import jwt from "jsonwebtoken";
import { ErrorFactory } from "./errors.js";
import logger from "./logger.js";
const generateUserToken = (payload)=>{
     try {
     
        return jwt.sign(payload,process.env.JWT_USER_SECRET,{
          expiresIn:process.env.JWT_EXPIRES_IN
        })
           } catch (error) {
          logger.error('Error generating user token:', error);
          throw new Error('Token generation failed');
     }
}

const generateResetToken = (payload)=>{
  try {
    return jwt.sign(payload,process.env.JWT_RESET_SECRET,{
      expiresIn:process.env.JWT_RESET_EXPIRES_IN||'60m'
    })
  } catch (error) {
    logger.error('Error generating reset token')
    throw new Error('Token generation failed')
  }
}
const verifyResetToken = (token) => {
  if (!token) {
    throw ErrorFactory.validation("No token provided");
  }

  if (!process.env.JWT_RESET_SECRET) {
    throw new Error("JWT_RESET_SECRET not configured");
  }

  try {
    return jwt.verify(token, process.env.JWT_RESET_SECRET);
  } catch (error) {
    throw ErrorFactory.authentication("Invalid or expired reset token");
  }
};
export { generateResetToken, generateUserToken, verifyResetToken };

