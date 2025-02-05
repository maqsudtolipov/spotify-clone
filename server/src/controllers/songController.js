const AppError = require("../utils/AppError");
const songService = require("../services/songService");

exports.uploadSong = async (req, res, next) => {
  try {
    if (!req.files.song || !req.files.img || !req.body.name) {
      return next(
        new AppError("All fields are required: song, img and name", 400),
      );
    }

    const songInput = {
      name: req.body.name,
      songBuffer: req.files.song[0].buffer,
      songFilename: req.files.song[0].filename,
      imgBuffer: req.files.img[0].buffer,
      imgFilename: req.files.img[0].filename,
      artistId: req.user.id,
      duration: req.files.song[0].duration,
    };
    const songs = await songService.uploadAndCreateSong(songInput);

    res.status(201).json({status: "success", songs});
  } catch (e) {
    next(e);
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      userId: req.user.id,
      name: req.body?.name || undefined,
      img: req.files.img
        ? {
          file: req.files.img[0].buffer,
          fileName: req.files.img[0].filename,
        }
        : null,
      song: req.files.song
        ? {
          file: req.files.song[0].filename,
          fileName: req.files.song[0].filename,
          duration: req.files.song[0].duration,
        }
        : null,
    };
    const songs = await songService.updateSong(songInput);

    res.status(200).json({status: "success", songs});
  } catch (e) {
    next(e);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      userId: req.user.id,
    };
    const songs = await songService.deleteSong(songInput);

    res.status(200).json({status: "success", songs});
  } catch (e) {
    next(e);
  }
};

exports.like = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      likedSongsId: req.user.likedSongs,
    };
    const likedSongs = await songService.likeSong(songInput);

    res.status(200).json({
      status: "success",
      likedSongs,
    });
  } catch (e) {
    next(e);
  }
};

exports.dislike = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      likedSongsId: req.user.likedSongs,
    };
    const likedSongs = await songService.dislikeSong(songInput);

    res.status(200).json({
      status: "success",
      likedSongs,
    });
  } catch (e) {
    next(e);
  }
};

exports.addSongToPlaylist = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.songId,
      playlistId: req.params.playlistId,
    };

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
