const playlistService = require("../services/playlistService");
const getPlaylist = require("../services/playlist/getPlaylist");
const createPlaylist = require("../services/playlist/createPlaylist");
const updatePlaylist = require("../services/playlist/updatePlaylist");
const validateInput = require("../utils/validateInput");
const {
  createPlaylistSchema,
  deletePlaylistParamSchema,
  updatePlaylistParamSchema,
  updatePlaylistSchema,
  removePlaylistSchema,
  savePlaylistSchema,
} = require("../validations/playlistValidations");
const { getNewestSongsCache } = require("../cache/songsCache");
const { getRecommendedPlaylists } = require("../cache/playlistCache");

exports.getPlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
    };
    const playlist = await getPlaylist(playlistInput);

    res.status(200).send({
      status: "success",
      playlist,
    });
  } catch (e) {
    next(e);
  }
};

exports.createPlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      name: req.body.name,
      userId: req.user.id,
      libraryId: req.user.library,
    };

    const { playlist } = await createPlaylist(playlistInput);

    res.status(201).send({
      status: "success",
      playlist,
    });
  } catch (e) {
    next(e);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      name: req.body.name,
      description: req.body.description,
      isPublic: req.body.isPublic,
      imgFile: req.files?.img?.[0],
      playlistId: req.params.id,
      userId: req.user.id,
    };

    const updatedPlaylist = await updatePlaylist(playlistInput);

    res.status(200).send({
      status: "success",
      playlist: updatedPlaylist,
    });
  } catch (e) {
    next(e);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
    };

    await playlistService.deletePlaylist(playlistInput);

    res.status(204).send({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};

exports.savePlaylistToLibrary = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
      libraryId: req.user?.library,
    };
    const { playlist } =
      await playlistService.savePlaylistToLibrary(playlistInput);

    res.status(200).send({
      status: "success",
      playlist,
    });
  } catch (e) {
    next(e);
  }
};

exports.removePlaylistFromLibrary = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
      libraryId: req.user?.library,
    };
    await playlistService.removePlaylistFromLibrary(playlistInput);

    res.status(204).send({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};

// Aggregation
exports.getRecommendedPlaylists = async (req, res, next) => {
  try {
    let playlists = await getRecommendedPlaylists();

    res.status(200).json({
      status: "success",
      playlists,
    });
  } catch (e) {
    next(e);
  }
};
