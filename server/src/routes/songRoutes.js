const express = require("express");
const songController = require("../controllers/songController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const router = express.Router();

router.route("/:id/").patch(ensureAuthenticated, songController.updateSong);

router.route("/:id/like").post(ensureAuthenticated, songController.like);
router.route("/:id/dislike").post(ensureAuthenticated, songController.dislike);

module.exports = router;
