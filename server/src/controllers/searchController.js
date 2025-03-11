const searchService = require("../services/searchService");
const Song = require("../models/songModel");

// TODO: no pagination here as this route only returns  top 5-10 results. Could be added later
// TODO: needs to return only necessary data

exports.search = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const { songs, playlists, artists, users } =
      await searchService.searchAllModels(req.query.name, limit);

    res.status(200).json({
      status: "success",
      results: {
        songs,
        playlists,
        artists,
        users,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.searchSongs = async (req, res, next) => {
  try {
    const limit = Math.max(parseInt(req.query.limit) || 10);
    const page = Math.max(parseInt(req.query.page) || 1);

    const filter = { name: { $regex: req.query.name, $options: "i" } };

    const totalCount = await Song.countDocuments(filter); // Count of matching documents
    const totalPages = Math.ceil(totalCount / limit);
    const validPage = Math.min(page, totalPages || 1); // Prevent over-paging

    const songs = await Song.find(filter)
      .limit(limit)
      .skip((validPage - 1) * limit);

    res.status(200).json({
      status: "success",
      songs,
      currentPage: validPage,
      totalPages,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
};

exports.searchSongs = async (req, res, next) => {
  try {
    const limit = Math.max(parseInt(req.query.limit) || 10);
    const page = Math.max(parseInt(req.query.page) || 1);

    const filter = { name: { $regex: req.query.name, $options: "i" } };

    const totalCount = await Song.countDocuments(filter); // Count of matching documents
    const totalPages = Math.ceil(totalCount / limit);
    const validPage = Math.min(page, totalPages || 1); // Prevent over-paging

    const songs = await Song.find(filter)
      .limit(limit)
      .skip((validPage - 1) * limit);

    res.status(200).json({
      status: "success",
      songs,
      currentPage: validPage,
      totalPages,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
};

exports.searchPlaylists = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
