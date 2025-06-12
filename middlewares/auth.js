import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  //console.log(JSON.stringify(req));
  const token = req.cookies?.token;
  //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDk5MGJlZjgxYjBkYTFmOTJkMTRmMCIsImlhdCI6MTc0OTY3OTQ1MSwiZXhwIjoxNzc1NTk5NDUxfQ.SaGyVzM6vhHEFPwoLBqIILeeylD6IMU_NwvfqrPLOU8";


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

  {/* user = {
        "_id": "684990bef81b0da1f92d14f0",
        "name": "Druvan",
        "email": "hello@gmail.com",
        "phone": 3465889108,
        "password": "$2a$10$Kh.HKG1qoqp7P3CmnIn9ZuE56ecZLSk7XQCyXrL5ApMxe/oY9ddJG",
        "role": "Employer",
        "createdAt": "2025-06-11T14:20:46.195Z",
        "__v": 0
    }; */}
  
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  req.user = user;
  console.log('in auth');
  console.log(user);
  next();
});
