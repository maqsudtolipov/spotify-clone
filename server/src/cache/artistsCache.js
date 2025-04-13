const User = require("../models/userModel");

let recommendedArtistsCache = [];

// Recommended artists
const getRecommendedArtistsCache = (songId) => recommendedArtistsCache;

const updateRecommendedArtistsCache = async (songId) => {
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

  recommendedArtistsCache = artists;
  return recommendedArtistsCache;
};

module.exports = {
  recommendedArtistsCache,
  getRecommendedArtistsCache,
  updateRecommendedArtistsCache,
};
