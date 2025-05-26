const Song = require("../models/songModel");
const redisClient = require("./redisClient");

const topSongsKey = "cache:topSongs";
const newestSongsKey = "cache:newestSongs";

// Top songs
const getTopSongsCache = async () => {
  const cached = await redisClient.get(topSongsKey);
  if (cached) return JSON.parse(cached);
  return updateTopSongsCache();
};

const updateTopSongsCache = async () => {
  const songs = await Song.find()
    .sort({ plays: -1 })
    .limit(10)
    .populate({ path: "song img", select: "url" });

  await redisClient.set(topSongsKey, JSON.stringify(songs), {
    EX: 60 * 60 * 1000, // 1 hour
  });

  return songs;
};

// Newest songs
const getNewestSongsCache = async () => {
  const cached = await redisClient.get(newestSongsKey);
  if (cached) return JSON.parse(cached);
  return updateNewestSongsCache();
};

const updateNewestSongsCache = async () => {
  const songs = await Song.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({ path: "song img", select: "url" });

  await redisClient.set(newestSongsKey, JSON.stringify(songs), {
    EX: 60 * 60 * 1000, // 1 hour
  });

  return songs;
};

module.exports = {
  getTopSongsCache,
  getNewestSongsCache,
  updateTopSongsCache,
  updateNewestSongsCache,
};
