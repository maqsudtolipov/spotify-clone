const artistService = require("../services/artistService");
const {
  getRecommendedArtistsCache,
  updateRecommendedArtistsCache,
} = require("../cache/artistsCache");

exports.getArtistById = async (req, res, next) => {
  try {
    const artistInput = {
      artistId: req.params.id,
    };
    const artist = await artistService.getArtistById(artistInput);

    res.status(200).json({ status: "success", artist });
  } catch (e) {
    next(e);
  }
};

// Aggregation routes
exports.getRecommendedArtists = async (req, res, next) => {
  try {
    let artists = [];
    const recommendedArtistsCache = getRecommendedArtistsCache();

    if (recommendedArtistsCache.length > 1) artists = recommendedArtistsCache;
    else artists = await updateRecommendedArtistsCache();

    res.status(200).json({ status: "success", artists });
  } catch (e) {
    next(e);
  }
};
