const artistService = require("../services/artistService");
const { getRecommendedArtistsCache } = require("../cache/artistsCache");

exports.getArtistById = async (req, res, next) => {
  try {
    const artist = await artistService.getArtistById({
      artistId: req.params.id,
    });

    res.status(200).json({ status: "success", artist });
  } catch (e) {
    next(e);
  }
};

// Aggregation routes
exports.getRecommendedArtists = async (req, res, next) => {
  try {
    let artists = await getRecommendedArtistsCache();

    res.status(200).json({ status: "success", artists });
  } catch (e) {
    next(e);
  }
};
