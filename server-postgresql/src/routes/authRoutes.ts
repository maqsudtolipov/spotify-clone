import express from "express";
import { signUpController } from "../controllers/auth/signUp";
const router = express.Router();

router.route("/signup").post(signUpController);

export default router;
