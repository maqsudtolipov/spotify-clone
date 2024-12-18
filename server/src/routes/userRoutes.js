const express = require("express");
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/authMiddlewares");

const router = express.Router();

router.route("/me").get(userController.me);

module.exports = router;
