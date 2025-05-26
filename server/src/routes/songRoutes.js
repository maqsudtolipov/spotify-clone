const express = require("express");
const songController = require("../controllers/songController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authorize = require("../middlewares/authorize");
const songsStorage = require("../storage/songsStorage");
const {
  uploadSongSchema,
  updateSongParamsSchema,
  deleteSongParamsSchema,
  likeSongParamsSchema,
  dislikeSongParamsSchema,
  addSongToPlaylistParamsSchema,
  removeSongFromPlaylistParamsSchema,
  playParamsSchema,
} = require("../validations/songValidation");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const router = express.Router();

router
  .route("/")
  .post(
    ensureAuthenticated,
    authorize(["artist"]),
    songsStorage.uploadSongFiles,
    songsStorage.processSongImg,
    songsStorage.processSongFile,
    validatorMiddleware(uploadSongSchema),
    songController.uploadSong,
  );

router.route("/top").get(ensureAuthenticated, songController.getTopSongs);
router.route("/newest").get(ensureAuthenticated, songController.getNewestSongs);

router
  .route("/:id")
  .patch(
    ensureAuthenticated,
    authorize(["artist"]),
    songsStorage.uploadSongFiles,
    songsStorage.processSongImg,
    songsStorage.processSongFile,
    validatorMiddleware(updateSongParamsSchema, "params"),
    songController.updateSong,
  )
  .delete(
    ensureAuthenticated,
    authorize(["artist"]),
    validatorMiddleware(deleteSongParamsSchema, "params"),
    songController.deleteSong,
  );

router
  .route("/:id/like")
  .post(
    ensureAuthenticated,
    validatorMiddleware(likeSongParamsSchema, "params"),
    songController.like,
  );
router
  .route("/:id/dislike")
  .post(
    ensureAuthenticated,
    validatorMiddleware(dislikeSongParamsSchema, "params"),
    songController.dislike,
  );

router
  .route("/:songId/save/:playlistId")
  .post(
    ensureAuthenticated,
    validatorMiddleware(addSongToPlaylistParamsSchema, "params"),
    songController.addSongToPlaylist,
  );

router
  .route("/:songId/remove/:playlistId")
  .delete(
    ensureAuthenticated,
    validatorMiddleware(removeSongFromPlaylistParamsSchema, "params"),
    songController.removeSongFromPlaylist,
  );

router
  .route("/:id/play")
  .post(
    ensureAuthenticated,
    validatorMiddleware(playParamsSchema, "params"),
    songController.play,
  );

module.exports = router;
