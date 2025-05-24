const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const playlistController = require("../controllers/playlistController");
const playlistStorage = require("../storage/playlistStorage");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const {
  getPlaylistParamSchema,
  createPlaylistSchema,
  deletePlaylistParamSchema,
  updatePlaylistParamSchema,
  updatePlaylistSchema,
  savePlaylistSchema,
} = require("../validations/playlistValidations");

const router = express.Router();

router
  .route("/")
  .post(
    ensureAuthenticated,
    validatorMiddleware(createPlaylistSchema),
    playlistController.createPlaylist,
  );

router
  .route("/:id")
  .get(
    ensureAuthenticated,
    validatorMiddleware(getPlaylistParamSchema, "params"),
    playlistController.getPlaylist,
  )
  .patch(
    ensureAuthenticated,
    playlistStorage.uploadPlaylistFiles,
    playlistStorage.processPlaylistImg,
    validatorMiddleware(updatePlaylistParamSchema, "params"),
    validatorMiddleware(updatePlaylistSchema),
    playlistController.updatePlaylist,
  )
  .delete(
    ensureAuthenticated,
    validatorMiddleware(deletePlaylistParamSchema, "params"),
    playlistController.deletePlaylist,
  );

router.post(
  "/save/:id",
  ensureAuthenticated,
  validatorMiddleware(savePlaylistSchema, "params"),
  playlistController.savePlaylistToLibrary,
);
router.delete(
  "/remove/:id",
  ensureAuthenticated,
  validatorMiddleware(deletePlaylistParamSchema, "params"),
  playlistController.removePlaylistFromLibrary,
);

module.exports = router;
