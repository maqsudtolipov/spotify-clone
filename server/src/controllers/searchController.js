exports.search = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      results: {
        songs: [],
        playlists: [],
        artists: [],
        profiles: []
      },
      pagination: {
        total: 400,
        page: 2,
        limit: 20,
        totalPages: 20
      }
    });
  } catch (e) {
    next(e);
  }
};
