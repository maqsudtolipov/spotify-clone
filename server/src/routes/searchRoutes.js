const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const searchController = require("../controllers/searchController");
const router = express.Router();

router.route("/").get(ensureAuthenticated, searchController.search);
router.route("/songs").get(ensureAuthenticated, searchController.searchSongs);
router
  .route("/playlists")
  .get(ensureAuthenticated, searchController.searchPlaylists);
router
  .route("/artists")
  .get(ensureAuthenticated, searchController.searchArtists);
router.route("/users").get(ensureAuthenticated, searchController.searchUsers);

module.exports = router;
