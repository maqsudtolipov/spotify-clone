const searchService = require("../services/searchService");

// TODO: no pagination here as this route only returns  top 5-10 results. Could be added later
// TODO: needs to return only necessary data

exports.search = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const { songs, playlists, artists, users } = await searchService.searchAllModels(
      req.query.name,
      limit,
    );

    res.status(200).json({
      status: "success",
      results: {
        songs,
        playlists,
        artists,
        users,
      },
      // pagination: {
      //   total: 400,
      //   page: 2,
      //   limit: 20,
      //   totalPages: 20,
      // },
    });
  } catch (e) {
    next(e);
  }
};
