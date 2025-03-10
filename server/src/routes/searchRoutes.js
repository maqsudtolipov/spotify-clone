const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const searchController = require("../controllers/searchController");
const router = express.Router();

router.route("/").get(ensureAuthenticated, searchController.search);

module.exports = router;
