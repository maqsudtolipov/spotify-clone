const Song = require("../models/songModel");

// TODO: no pagination here as this route only returns  top 5-10 results. Could be added later
exports.search = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const songs = await Song.find({
      name: { $regex: req.query.name, $options: "i" },
    })
      .skip(limit * page)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: {
        songs,
        playlists: [],
        artists: [],
        profiles: [],
      },
      pagination: {
        total: 400,
        page: 2,
        limit: 20,
        totalPages: 20,
      },
    });
  } catch (e) {
    next(e);
  }
};
