const Song = require("../models/songModel");

let topSongsCache = [];

const getTopSongsCache = () => topSongsCache;

const updateTopSongsCache = async () => {
  topSongsCache = await Song.find()
    .sort({ plays: -1 })
    .limit(10)
    .populate({ path: "song img", select: "url" });
  return topSongsCache;
};

module.exports = {
  topSongsCache,
  updateTopSongsCache,
  getTopSongsCache
};
