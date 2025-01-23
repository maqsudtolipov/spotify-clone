const AppError = require("../utils/AppError");
const imagekit = require("../utils/ImageKit");
const Song = require("../models/songModel");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");

exports.uploadSong = async (req, res, next) => {
  try {
    if (!req.files.song || !req.files.img || !req.body.name) {
      return next(
        new AppError("All fields are required: song, img and name", 400),
      );
    }

    const songUpload = await imagekit.upload({
      file: req.files.song[0].buffer,
      fileName: req.files.song[0].filename,
      folder: "spotify/songs/",
    });

    const imgUpload = await imagekit.upload({
      file: req.files.img[0].buffer,
      fileName: req.files.img[0].filename,
      folder: "spotify/songs/",
    });

    const songInput = {
      name: req.body.name,
      song: songUpload.url,
      img: imgUpload.url,
      artist: req.user.id,
      duration: req.files.song[0].duration,
    };

    const song = await Song.create(songInput);
    const { songs } = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: { songs: song.id },
      },
      {
        new: true,
      },
    ).populate("songs", "id name artist song img plays duration");

    res.status(201).json({
      status: "success",
      songs,
    });
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
