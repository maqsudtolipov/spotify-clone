const express = require("express");
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.get(
  "/",
  ensureAuthenticated,
  authorize(["admin"]),
  userController.getAll,
);
router.get("/current", ensureAuthenticated, userController.current);

router.patch("/updateMe", ensureAuthenticated, userController.updateMe);

module.exports = router;
