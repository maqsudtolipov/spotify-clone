const express = require("express");
const authController = require("./authController");

const router = express.Router();

router.route("/sign-up").post(authController.signUp);
router.route("/login").post(authController.login);

module.exports = router;
