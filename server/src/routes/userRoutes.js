const express = require("express");
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const router = express.Router();

router.get("/current", ensureAuthenticated, userController.current);

module.exports = router;
