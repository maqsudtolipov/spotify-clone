const Song = require("../models/songModel");

let topSongsCache = [];
let newestSongsCache = [];

// Top songs
const getTopSongsCache = () => topSongsCache;

const updateTopSongsCache = async () => {
  topSongsCache = await Song.find()
    .sort({ plays: -1 })
    .limit(10)
    .populate({ path: "song img", select: "url" });
  return topSongsCache;
};

// Newest songs
const getNewestSongsCache = () => newestSongsCache;

const updateNewestSongsCache = async () => {
  newestSongsCache = await Song.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({ path: "song img", select: "url" });
  return newestSongsCache;
};

module.exports = {
  topSongsCache,
  newestSongsCache,
  getTopSongsCache,
  getNewestSongsCache,
  updateTopSongsCache,
  updateNewestSongsCache,
};
