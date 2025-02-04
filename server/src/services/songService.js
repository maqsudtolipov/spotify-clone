const {imagekitUpload} = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Song = require("../models/songModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const uploadImgFile = require("../utils/uploadImgFile");
const Playlist = require("../models/playlistModel");

exports.uploadAndCreateSong = async (songInput) => {
  const songUpload = await imagekitUpload({
    file: songInput.songBuffer,
    fileName: songInput.songFilename,
    folder: "songs/",
  });
  const songFile = await File.create(songUpload);

  const imgUpload = await imagekitUpload({
    file: songInput.imgBuffer,
    fileName: songInput.imgFilename,
    folder: "songs/",
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
    {_id: songInput.artistId},
    {$push: {songs: song.id}},
    {new: true},
  ).populate({
    path: "songs",
    select: "id name artist plays duration",
    populate: {path: "song img", select: "url"},
  });

  return updatedUser.songs;
};

// TODO: make sure to delete old files
exports.updateSong = async (songInput) => {
  // Validate
  const song = await Song.findById(songInput.songId).populate("img song");

  if (!song) {
    throw new AppError("Song not found", 404);
  }

  if (songInput.userId !== String(song.artist)) {
    throw new AppError("You are not owner of this song", 403);
  }

  // Update
  const newSongData = {};

  if (songInput.name) {
    newSongData.name = songInput.name;
  }

  if (songInput.img) {
    const imgFile = await uploadImgFile(
      {
        imgBuffer: songInput.img.file,
        fileName: songInput.img.fileName,
        folder: "spotify/songs/",
      },
      false,
      song.img.fileId,
      song.img.id,
    );
    newSongData.img = imgFile.id;
  }

  if (songInput.song) {
    const songFile = await uploadImgFile(
      {
        imgBuffer: songInput.song.file,
        fileName: songInput.song.fileName,
        folder: "spotify/songs/",
      },
      false,
      song.song.fileId,
      song.song.id,
    );
    newSongData.song = songFile.id;
    newSongData.duration = songInput.song.duration;
  }

  await Song.findByIdAndUpdate(song.id, newSongData, {
    new: true,
    runValidator: true,
  });

  const user = await User.findById(songInput.userId).populate(
    "songs",
    "id name artist song img plays duration",
  );
  return user.songs;
};

exports.likeSong = async (songInput) => {
  const song = await Song.findById(songInput.songId);

  if (!song) {
    throw new AppError("Song not found", 404);
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    songInput.likedSongsId,
    {
      $addToSet: {songs: song.id},
    },
    {new: true},
  );

  return updatedPlaylist.songs;
};

exports.dislikeSong = async (songInput) => {
  const song = await Song.findById(songInput.songId);

  if (!song) {
    throw new AppError("Song not found", 404);
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    songInput.likedSongsId,
    {
      $pull: {songs: song.id},
    },
    {new: true},
  );
  return updatedPlaylist.songs;
};
