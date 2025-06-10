// ErrorHandler class for creating custom error objects
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware to handle errors centrally in Express
export const errorMiddleware = (err, req, res, next) => {
  let customError = { ...err };
  customError.message = err.message || "Internal Server Error";
  customError.statusCode = err.statusCode || 500;

  // Handle specific Mongoose / JWT errors
  if (err.name === "CastError") {
    customError.message = `Resource not found. Invalid ${err.path}`;
    customError.statusCode = 400;
  } else if (err.code === 11000) {
    customError.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    customError.statusCode = 400;
  } else if (err.name === "JsonWebTokenError") {
    customError.message = "JSON Web Token is invalid, try again!";
    customError.statusCode = 401;
  } else if (err.name === "TokenExpiredError") {
    customError.message = "JSON Web Token has expired, try again!";
    customError.statusCode = 401;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

export default ErrorHandler;
