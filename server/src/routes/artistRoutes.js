const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const artistController = require("../controllers/artistController");
const { getArtistParamSchema } = require("../validations/artistValidations");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const router = express.Router();

router.get(
  "/recommended",
  ensureAuthenticated,
  artistController.getRecommendedArtists,
);
router.get(
  "/:id",
  ensureAuthenticated,
  validatorMiddleware(getArtistParamSchema, "params"),
  artistController.getArtistById,
);

module.exports = router;
