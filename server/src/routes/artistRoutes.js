const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const artistController = require("../controllers/artistController");
const songController = require("../controllers/songController");
const songsStorage = require("../middlewares/songsStorage");
const authorize = require("../middlewares/authorize");

const router = express.Router();

// Artist
router.get("/:id", ensureAuthenticated, artistController.getArtistById);

// Songs
router.post(
  "/:id/songs",
  ensureAuthenticated,
  authorize(["artist"]),
  songsStorage.uploadSongFiles,
  songsStorage.processSongImg,
  songsStorage.processSongFile,
  songController.uploadSong,
);

module.exports = router;
