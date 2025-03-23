import express from "express";
import { createJob, getAllJobs, getJobById, getRecruiterJobs } from "../controllers/job.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import hasRole from "../middlewares/hasRole.js";

const router = express.Router();
router.post("/create", isAuthenticated, hasRole("recruiter"), createJob);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-job-by-id/:id", getJobById);
router.get("/get-recruiter-job", isAuthenticated, hasRole("recruiter"), getRecruiterJobs);

export default router;