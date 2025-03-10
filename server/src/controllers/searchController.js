const Song = require("../models/songModel");
const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");

// TODO: no pagination here as this route only returns  top 5-10 results. Could be added later
// TODO: needs to return only necessary data

exports.search = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const songs = await Song.find({
      name: { $regex: req.query.name, $options: "i" },
    }).limit(limit);
    const playlists = await Playlist.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    const artists = await User.find({
      name: { $regex: req.query.name, $options: "i" },
      role: "artist",
    });
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
      role: "user",
    });

    res.status(200).json({
      status: "success",
      results: {
        songs,
        playlists,
        artists,
        profiles: users,
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
