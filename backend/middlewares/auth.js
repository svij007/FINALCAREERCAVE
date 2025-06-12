import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  
  console.log('in auth.js');
  console.log('cookies = ' + JSON.stringify(req.cookies));
  const token = req.cookies?.token;

  if (!token) {
    return next(new ErrorHandler("User Not Authorized - No Token", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or Expired Token", 401));
  }

  const user = await User.findById(decoded.id).select("-password");
  
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  req.user = user;
  console.log('user => ' + user);
  next();
});
