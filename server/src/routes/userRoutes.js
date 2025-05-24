const express = require("express");
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authorize = require("../middlewares/authorize");
const { uploadUserImg, resizeUserImg } = require("../storage/userStorage");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const {
  getUserByIdSchema,
  updateMeSchema,
  followUserSchema,
  unfollowUserSchema,
} = require("../validations/userValidations");

const router = express.Router();

router.get(
  "/",
  ensureAuthenticated,
  authorize(["admin"]),
  userController.getAll,
);
router.get("/current", ensureAuthenticated, userController.current);

router.get(
  "/:id",
  ensureAuthenticated,
  validatorMiddleware(getUserByIdSchema, "params"),
  userController.getUserById,
);

router.patch(
  "/updateMe",
  ensureAuthenticated,
  uploadUserImg,
  resizeUserImg,
  validatorMiddleware(updateMeSchema),
  userController.updateMe,
);

// Follows
router.post(
  "/follow/:id",
  ensureAuthenticated,
  validatorMiddleware(followUserSchema, "params"),
  userController.followUser,
);
router.post(
  "/unfollow/:id",
  ensureAuthenticated,
  validatorMiddleware(unfollowUserSchema),
  userController.unfollowUser,
);

module.exports = router;
