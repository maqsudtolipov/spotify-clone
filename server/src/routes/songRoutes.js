const express = require("express");
const songController = require("../controllers/songController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authorize = require("../middlewares/authorize");
const songsStorage = require("../storage/songsStorage");
const router = express.Router();

router
  .route("/")
  .post(
    ensureAuthenticated,
    authorize(["artist"]),
    songsStorage.uploadSongFiles,
    songsStorage.processSongImg,
    songsStorage.processSongFile,
    songController.uploadSong,
  );

router.route("/top").get(ensureAuthenticated, songController.getTopSongs);

router
  .route("/:id")
  .patch(
    ensureAuthenticated,
    authorize(["artist"]),
    songsStorage.uploadSongFiles,
    songsStorage.processSongImg,
    songsStorage.processSongFile,
    songController.updateSong,
  )
  .delete(
    ensureAuthenticated,
    authorize(["artist"]),
    songController.deleteSong,
  );

router.route("/:id/like").post(ensureAuthenticated, songController.like);
router.route("/:id/dislike").post(ensureAuthenticated, songController.dislike);

router
  .route("/:songId/save/:playlistId")
  .post(ensureAuthenticated, songController.addSongToPlaylist);

router
  .route("/:songId/remove/:playlistId")
  .delete(ensureAuthenticated, songController.removeSongFromPlaylist);

module.exports = router;
