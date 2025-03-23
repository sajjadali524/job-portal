import express from "express";
import { applyForJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import hasRole from "../middlewares/hasRole.js";

const router = express.Router();
router.post("/apply/:id", isAuthenticated, hasRole("student"), applyForJob);
router.get("/get-applied-jobs", isAuthenticated, hasRole("student"), getAppliedJobs);
router.get("/get-applicants/:id", isAuthenticated, hasRole("recruiter"), getApplicants);
router.patch("/update-status/:id", isAuthenticated, hasRole("recruiter"), updateStatus);

export default router;