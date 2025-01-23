const express = require("express");
const songController = require("../controllers/songController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authorize = require("../middlewares/authorize");
const songsStorage = require("../middlewares/songsStorage");
const router = express.Router();

router
  .route("/:id/")
  .patch(
    ensureAuthenticated,
    authorize(["artist"]),
    songsStorage.uploadSongFiles,
    songsStorage.processSongImg,
    songsStorage.processSongFile,
    songController.updateSong,
  );

router.route("/:id/like").post(ensureAuthenticated, songController.like);
router.route("/:id/dislike").post(ensureAuthenticated, songController.dislike);

module.exports = router;
