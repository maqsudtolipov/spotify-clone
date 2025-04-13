const {
  updateTopSongsCache,
  updateNewestSongsCache,
} = require("../cache/songsCache");
const { updateRecommendedArtistsCache } = require("../cache/artistsCache");

const updateCache = async () => {
  console.log("⚪️ Starting updating cache");

  try {
    await updateTopSongsCache();
    await updateNewestSongsCache();
    await updateRecommendedArtistsCache();

    console.log("⚪️ Aggregation cache is updated");
  } catch (e) {
    console.error("⬜️ Error updating cache: ", e);
  }
};

module.exports = updateCache;
