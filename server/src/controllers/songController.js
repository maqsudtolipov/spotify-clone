const AppError = require("../utils/AppError");
const imagekit = require("../utils/ImageKit");
const Song = require("../models/songModel");
const User = require("../models/userModel");

exports.uploadSong = async (req, res, next) => {
  try {
    if (
      !req.files.song[0].filename ||
      !req.files.img[0].filename ||
      !req.body.name
    ) {
      return next(new AppError("All fields are required: song, img and name"));
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
      duration: req.files.song[0].duration
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
    ).populate("songs", "id name artist song img plays");

    res.status(201).json({
      status: "success",
      songs,
    });
  } catch (e) {
    next(e);
  }
};
