const redisClient = require("./redisClient");
const Playlist = require("../models/playlistModel");

const recommendedPlaylistsKey = "cache:recommendedPlaylists";

const getRecommendedPlaylists = async () => {
  const cached = await redisClient.get(recommendedPlaylistsKey);
  if (cached) return JSON.parse(cached);
  return updateRecommendedPlaylistsCache();
};

const updateRecommendedPlaylistsCache = async () => {
  const playlists = await Playlist.find({
    $expr: { $gt: [{ $size: "$songs" }, 15] },
    isPublic: true,
    isLikedSongs: false,
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("name id img user +isPublic")
    .populate([
      { path: "img", select: "url" },
      {
        path: "user",
        select: "name",
      },
    ]);

  await redisClient.set(recommendedPlaylistsKey, JSON.stringify(playlists), {
    EX: 60 * 60 * 1000, // 1 hour
  });

  return playlists;
};

module.exports = {
  getRecommendedPlaylists,
};
