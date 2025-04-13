const { updateTopSongsCache } = require("../cache/songsCache");

const updateCache = async () => {
  console.log("⚪️ Starting updating cache");

  try {
    await updateTopSongsCache();

    console.log("⚪️ Aggregation cache is updated");
  } catch (e) {
    console.error("⬜️ Error updating cache: ", e);
  }
};

module.exports = updateCache;
