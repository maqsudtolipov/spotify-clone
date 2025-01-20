const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const artistController = require("../controllers/artistController");
const songController = require("../controllers/songController");
const songsStorage = require("../middlewares/songsStorage");

const router = express.Router();

// Artist
router.get("/:id", ensureAuthenticated, artistController.getArtistById);

// Songs
router.post(
  "/:id/songs",
  ensureAuthenticated,
  songsStorage.uploadSongFiles,
  songsStorage.processSongImg,
  songsStorage.processSongFile,
  songController.uploadSong,
);

module.exports = router;
