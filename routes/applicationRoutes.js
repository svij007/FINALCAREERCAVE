\import express from "express";
import {
  employerGetAllApplications,
  jobseekerGetAllApplications,
  postApplication,
  jobseekerDeleteApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Jobseeker posts an application to a job
router.post("/post", isAuthenticated, postApplication);

// Employer retrieves all applications for their posted jobs
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);

// Jobseeker retrieves all applications they’ve submitted
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);

// Jobseeker deletes an application by ID
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

export default router;
