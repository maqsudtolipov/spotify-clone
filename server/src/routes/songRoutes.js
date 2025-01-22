const express = require("express");
const songController = require("../controllers/songController");
const router = express.Router();

router.route("/:id/like").post(songController.like);
router.route("/:id/dislike").post(songController.dislike);

module.exports = router;
