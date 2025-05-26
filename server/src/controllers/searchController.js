const searchService = require("../services/searchService");
const Song = require("../models/songModel");
const { getPaginationResults } = require("../helpers/searchHelpers");
const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");

exports.search = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

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
    const filter = { name: { $regex: req.query.name, $options: "i" } };

    const { limit, totalCount, totalPages, validPage } =
      await getPaginationResults(
        Playlist,
        filter,
        req.query.limit,
        req.query.page,
      );

    const songs = await Song.find(filter)
      .limit(limit)
      .skip((validPage - 1) * limit)
      .select("name duration song img")
      .populate([
        { path: "song img", select: "url" },
        { path: "artist", select: "name" },
        { path: "playCount", select: "totalPlays" },
      ]);

    res.status(200).json({
      status: "success",
      songs,
      pagination: {
        limit,
        currentPage: validPage,
        totalPages,
        totalCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.searchPlaylists = async (req, res, next) => {
  try {
    const filter = {
      name: { $regex: req.query.name, $options: "i" },
      isPublic: true,
      isLikedSongs: false,
    };

    const { limit, totalCount, totalPages, validPage } =
      await getPaginationResults(
        Playlist,
        filter,
        req.query.limit,
        req.query.page,
      );

    const playlists = await Playlist.find(filter)
      .limit(limit)
      .skip((validPage - 1) * limit)
      .select("name img user")
      .populate([
        { path: "img", select: "url" },
        { path: "user", select: "name" },
      ]);

    res.status(200).json({
      status: "success",
      playlists,
      pagination: {
        limit,
        currentPage: validPage,
        totalPages,
        totalCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.searchArtists = async (req, res, next) => {
  try {
    const filter = {
      role: "artist",
      name: { $regex: req.query.name, $options: "i" }, // Search by name, case-insensitive
    };

    const { limit, totalCount, totalPages, validPage } =
      await getPaginationResults(User, filter, req.query.limit, req.query.page);

    const artists = await User.find(filter)
      .limit(limit)
      .skip((validPage - 1) * limit)
      .select("name img")
      .populate({ path: "img", select: "url" });

    res.status(200).json({
      status: "success",
      artists,
      pagination: {
        limit,
        currentPage: validPage,
        totalPages,
        totalCount,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const filter = {
      role: "user",
      name: { $regex: req.query.name, $options: "i" }, // Search by name, case-insensitive
    };

    const { limit, totalCount, totalPages, validPage } =
      await getPaginationResults(User, filter, req.query.limit, req.query.page);

    const users = await User.find(filter)
      .limit(limit)
      .skip((validPage - 1) * limit)
      .select("name img")
      .populate({ path: "img", select: "url" });

    res.status(200).json({
      status: "success",
      users,
      pagination: {
        limit,
        currentPage: validPage,
        totalPages,
        totalCount,
      },
    });
  } catch (e) {
    next(e);
  }
};
