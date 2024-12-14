const express = require("express");
const authController = require("./authController");

const router = express.Router();

router.route("/sign-up").post(authController.signUp);

module.exports = router;
