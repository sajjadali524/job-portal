import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import hasRole from "../middlewares/hasRole.js";
import singleUpload from "../config/multerConfig.js";

const router = express.Router();

router.post("/register", isAuthenticated, hasRole("recruiter"), registerCompany);
router.get("/get/companies", isAuthenticated, hasRole("recruiter"), getCompany);
router.get("/get/company/:id", isAuthenticated, hasRole("recruiter"), getCompanyById);
router.put("/update/company/:id", isAuthenticated, hasRole("recruiter"), singleUpload.single("logo"), updateCompany);

export default router;