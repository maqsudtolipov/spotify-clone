const AppError = require("../utils/AppError");
const imagekit = require("../utils/ImageKit");
const Song = require("../models/songModel");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const File = require("../models/fileModel");
const songService = require("../services/songService");

/*
TODO:
  [+] Move more methods to models, followings MVC
  [+] Add services to file structure
  [-] Create tests
*/

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

    res.status(201).json({ status: "success", songs });
  } catch (e) {
    next(e);
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    // Validate
    const song = await Song.findById(req.params.id);

    if (!song) {
      return next(new AppError("Song not found", 404));
    }

    if (req.user.id !== String(song.artist)) {
      return next(new AppError("You are not owner of this song", 403));
    }

    // Update
    const songInput = {};

    if (req.body.name) {
      songInput.name = req.body.name;
    }

    if (req.files.img) {
      const imgUpload = await imagekit.upload({
        file: req.files.img[0].buffer,
        fileName: req.files.img[0].filename,
        folder: "spotify/songs/",
      });
      songInput.img = imgUpload.url;
    }

    if (req.files.song) {
      const songUpload = await imagekit.upload({
        file: req.files.song[0].buffer,
        fileName: req.files.song[0].filename,
        folder: "spotify/songs/",
      });
      songInput.song = songUpload.url;
      songInput.duration = req.files.song[0].duration;
    }

    await Song.findByIdAndUpdate(song.id, songInput, {
      new: true,
      runValidator: true,
    });

    const user = await User.findById(req.user.id).populate(
      "songs",
      "id name artist song img plays duration",
    );

    res.status(200).json({ status: "success", songs: user.songs });
  } catch (e) {
    next(e);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    // Validate
    const song = await Song.findById(req.params.id);

    if (!song) {
      return next(new AppError("Song not found", 404));
    }

    if (req.user.id !== String(song.artist)) {
      return next(new AppError("You are not owner of this song", 403));
    }

    // TODO: delete files
    await Song.findByIdAndDelete(song.id);

    const user = await User.findById(req.user.id).populate(
      "songs",
      "id name artist song img plays duration",
    );

    res.status(200).json({ status: "success", songs: user.songs });
  } catch (e) {
    next(e);
  }
};

// Like Song
exports.like = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return next(new AppError("Song not found", 404));
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.user.likedSongs,
      {
        $addToSet: { songs: song.id },
      },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      likedSongs: updatedPlaylist.songs,
    });
  } catch (e) {
    next(e);
  }
};

exports.dislike = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return next(new AppError("Song not found", 404));
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.user.likedSongs,
      {
        $pull: { songs: song.id },
      },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      likedSongs: updatedPlaylist.songs,
    });
  } catch (e) {
    next(e);
  }
};
