const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/sign-up").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/refresh-token").post(authController.refreshToken);

module.exports = router;
