import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AppError } from "../utils/errors.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Access token required", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Access token missing", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error); 
  }
};

export default authenticateUser;
