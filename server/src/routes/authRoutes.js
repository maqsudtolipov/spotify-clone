const express = require("express");
const authController = require("../controllers/authController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const { signUpSchema, loginSchema } = require("../validations/authValidations");

const router = express.Router();

router
  .route("/signup")
  .post(validatorMiddleware(signUpSchema), authController.signUp);
router
  .route("/login")
  .post(validatorMiddleware(loginSchema), authController.login);
router.route("/refresh-token").post(authController.refreshToken);
router.route("/logout").post(ensureAuthenticated, authController.logout);

module.exports = router;
