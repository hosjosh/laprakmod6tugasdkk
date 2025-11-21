import express from "express";
import { loginUser, loginWithToken } from "./authController.js";

const router = express.Router();

// Login pakai username + password
router.post("/login", loginUser);

// Login pakai API TOKEN manual
router.post("/token-login", loginWithToken);

export default router;
