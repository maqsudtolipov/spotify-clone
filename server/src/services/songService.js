const imagekit = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Song = require("../models/songModel");
const User = require("../models/userModel");

exports.uploadAndCreateSong = async (songInput) => {
  const songUpload = await imagekit.upload({
    file: songInput.songBuffer,
    fileName: songInput.songFilename,
    folder: "spotify/songs/",
  });
  const songFile = await File.create(songUpload);

  const imgUpload = await imagekit.upload({
    file: songInput.ingBuffer,
    fileName: songInput.ingFilename,
    folder: "spotify/songs/",
  });
  const imgFile = await File.create(imgUpload);

  const song = await Song.create({
    name: songInput.name,
    song: songFile.id,
    img: imgFile.id,
    artist: songInput.artistId,
    duration: songInput.duration,
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { songs: song.id } },
    { new: true },
  ).populate({
    path: "songs",
    select: "id name artist plays duration",
    populate: { path: "song img", select: "url" },
  });

  return updatedUser.songs;
};
