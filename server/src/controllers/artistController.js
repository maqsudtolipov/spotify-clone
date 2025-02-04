const artistService = require("../services/artistService");

exports.getArtistById = async (req, res, next) => {
  try {
    const artistInput = {
      artistId: req.params.id,
    };
    const artist = await artistService.getArtistById(artistInput);

    res.status(200).json({status: "success", artist});
  } catch (e) {
    next(e);
  }
};
