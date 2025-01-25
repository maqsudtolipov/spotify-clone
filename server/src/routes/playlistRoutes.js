const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const playlistController = require("../controllers/playlistController");

const router = express.Router();

router.route("/").post(ensureAuthenticated, playlistController.createPlaylist);

module.exports = router;