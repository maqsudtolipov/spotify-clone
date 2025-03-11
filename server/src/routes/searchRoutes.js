const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const searchController = require("../controllers/searchController");
const router = express.Router();

router.route("/").get(ensureAuthenticated, searchController.search);
router.route("/songs").get(ensureAuthenticated, searchController.searchSongs);

module.exports = router;
