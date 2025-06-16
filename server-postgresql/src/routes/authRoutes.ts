import express from "express";
import { signUpController } from "../controllers/auth/signUp";
import { loginController } from "../controllers/auth/login";
import { validate } from "../middlewares/validate";
import { signUpSchema } from "../validations/authValidations";
import { loginSchema } from "../validations/authValidations";
const router = express.Router();

router.route("/signup").post(validate(signUpSchema, "body"), signUpController);
router.route("/login").post(validate(loginSchema, "body"), loginController);

export default router;
