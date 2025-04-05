import express from "express";
import { loginAccount, logoutAccount, registerAccount, updateAccountProfile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import hasRole from "../middlewares/hasRole.js";
import singleUpload from "../config/multerConfig.js";


const router = express.Router();
router.post("/register", singleUpload.single("profilePhoto"), registerAccount);
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);
router.put("/profile/update/:id", isAuthenticated, hasRole("student"), singleUpload.single("resume"), updateAccountProfile);

export default router;