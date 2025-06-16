import express from "express";
import { signUpController } from "../controllers/auth/signUp";
import { validate } from "../middlewares/validate";
import { signUpSchema } from "../validations/authValidations";
const router = express.Router();

router.route("/signup").post(validate(signUpSchema, 'body'), signUpController);

export default router;
