import express from "express";
import dbConnection from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

// Load environment variables
config({ path: "./config/config.env" });

// Connect to DB
dbConnection();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// CORS setup to allow Vercel frontend
//app.use(
 // cors({
   // origin: process.env.FRONTEND_URL, // e.g. https://yourfrontend.vercel.app
    //methods: ["GET", "POST", "PUT", "DELETE"],
   // credentials: true,
//  })
//);

// Parse cookies and body
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload support
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Prevent caching of API responses
app.use((req, res, next) => {
  if (req.url.startsWith("/api")) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
  }
  next();
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Error handler
app.use(errorMiddleware);

export default app;
