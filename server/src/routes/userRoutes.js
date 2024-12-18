const express = require("express");
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../middleware/authMiddlewares");

const router = express.Router();

router.get("/me", ensureAuthenticated, userController.me);

module.exports = router;
