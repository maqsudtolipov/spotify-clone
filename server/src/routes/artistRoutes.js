const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const artistController = require("../controllers/artistController");

const router = express.Router();

router.get(
  "/recommended",
  ensureAuthenticated,
  artistController.getRecommendedArtists,
);
router.get("/:id", ensureAuthenticated, artistController.getArtistById);

module.exports = router;
