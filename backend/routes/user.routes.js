import express from "express";
import { loginAccount, logoutAccount, registerAccount } from "../controllers/user.controllers.js";


const router = express.Router();
router.post("/register", registerAccount);
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);

export default router;