const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const playlistController = require("../controllers/playlistController");
const playlistStorage = require("../storage/playlistStorage");

const router = express.Router();

router.route("/").post(ensureAuthenticated, playlistController.createPlaylist);

router
  .route("/:id")
  .patch(
    ensureAuthenticated,
    playlistStorage.uploadPlaylistFiles,
    playlistController.updatePlaylist,
  );

module.exports = router;
