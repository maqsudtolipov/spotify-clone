const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const playlistController = require("../controllers/playlistController");
const playlistStorage = require("../storage/playlistStorage");

const router = express.Router();

router.route("/").post(ensureAuthenticated, playlistController.createPlaylist);

router
  .route("/:id")
  .get(ensureAuthenticated, playlistController.getPlaylist)
  .patch(
    ensureAuthenticated,
    playlistStorage.uploadPlaylistFiles,
    playlistStorage.processPlaylistImg,
    playlistController.updatePlaylist,
  )
  .delete(ensureAuthenticated, playlistController.deletePlaylist);

router.patch(
  "/save/:id",
  ensureAuthenticated,
  playlistController.savePlaylistToLibrary,
);
router.patch(
  "/remove/:id",
  ensureAuthenticated,
  playlistController.removePlaylistFromLibrary,
);

module.exports = router;
