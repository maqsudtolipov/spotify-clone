const express = require("express");
const authController = require("../controllers/authController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/refresh-token").post(authController.refreshToken);
router.route("/logout").get(ensureAuthenticated, authController.logout);

module.exports = router;
