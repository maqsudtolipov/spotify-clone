const User = require("../models/userModel");
const redisClient = require("./redisClient");

const recommendedArtistsKey = "cache:recommendedArtists";

// Recommended artists
const getRecommendedArtistsCache = async () => {
  const cached = await redisClient.get(recommendedArtistsKey);
  if (cached) return JSON.parse(cached);
  return updateRecommendedArtistsCache();
};

const updateRecommendedArtistsCache = async () => {
  // Aggregate random 10 artists
  const artistIds = await User.aggregate([
    { $match: { role: "artist" } },
    { $sample: { size: 10 } },
    { $project: { _id: 1 } },
  ]);

  const ids = artistIds.map((a) => a._id);

  // Populate them
  const artists = [];

  for (let id of ids) {
    const artist = await User.findById(id).populate({
      path: "img",
      select: "url",
    });

    artists.push(artist);
  }

  await redisClient.set(recommendedArtistsKey, JSON.stringify(artists), {
    EX: 60 * 60 * 1000, // 1 hour
  });

  return artists;
};

module.exports = {
  getRecommendedArtistsCache,
  updateRecommendedArtistsCache,
};
