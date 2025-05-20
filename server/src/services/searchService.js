const Song = require("../models/songModel");
const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");

exports.searchAllModels = async (name, limit) => {
  const songs = await Song.find({
    name: { $regex: name, $options: "i" },
  })
    .limit(limit)
    .select("name duration song img")
    .populate([
      { path: "song img", select: "url" },
      { path: "artist", select: "name" },
      { path: "playCount", select: "totalPlays" },
    ]);

  const playlists = await Playlist.find({
    name: { $regex: name, $options: "i" },
    isPublic: true,
    isLikedSongs: false,
  })
    .limit(limit)
    .select("name img user")
    .populate([
      { path: "img", select: "url" },
      { path: "user", select: "name" },
    ]);

  const artists = await User.find({
    name: { $regex: name, $options: "i" },
    role: "artist",
  })
    .limit(limit)
    .select("name img")
    .populate({ path: "img", select: "url" });

  const users = await User.find({
    name: { $regex: name, $options: "i" },
    role: "user",
  })
    .limit(limit)
    .select("name img")
    .populate({ path: "img", select: "url" });

  return { songs, artists, playlists, users };
};
