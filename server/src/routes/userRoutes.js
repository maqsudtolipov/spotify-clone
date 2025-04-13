const express = require("express");
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authorize = require("../middlewares/authorize");
const {uploadUserImg, resizeUserImg} = require("../storage/userStorage");

const router = express.Router();

router.get(
  "/",
  ensureAuthenticated,
  authorize(["admin"]),
  userController.getAll,
);
router.get("/current", ensureAuthenticated, userController.current);
router.get("/:id", ensureAuthenticated, userController.getUserById);

router.patch(
  "/updateMe",
  ensureAuthenticated,
  uploadUserImg,
  resizeUserImg,
  userController.updateMe,
);

// Follows
router.post("/follow/:id", ensureAuthenticated, userController.followUser);
router.post("/unfollow/:id", ensureAuthenticated, userController.unfollowUser);

module.exports = router;
