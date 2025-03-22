import express from "express";
import { loginAccount, logoutAccount, registerAccount, updateAccountProfile } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import hasRole from "../middlewares/hasRole.js";


const router = express.Router();
router.post("/register", registerAccount);
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);
router.put("/profile/update/:id", isAuthenticated, hasRole("student"), updateAccountProfile);

export default router;