const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const searchController = require("../controllers/searchController");
const { searchQuerySchema } = require("../validations/searchValidations");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const router = express.Router();

router
  .route("/")
  .get(
    ensureAuthenticated,
    validatorMiddleware(searchQuerySchema, "query"),
    searchController.search,
  );

router
  .route("/songs")
  .get(
    ensureAuthenticated,
    validatorMiddleware(searchQuerySchema, "query"),
    searchController.searchSongs,
  );

router
  .route("/playlists")
  .get(
    ensureAuthenticated,
    validatorMiddleware(searchQuerySchema, "query"),
    searchController.searchPlaylists,
  );

router
  .route("/artists")
  .get(
    ensureAuthenticated,
    validatorMiddleware(searchQuerySchema, "query"),
    searchController.searchArtists,
  );

router
  .route("/users")
  .get(
    ensureAuthenticated,
    validatorMiddleware(searchQuerySchema, "query"),
    searchController.searchUsers,
  );

module.exports = router;
