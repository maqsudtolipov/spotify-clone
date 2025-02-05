const {imagekitDelete} = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Song = require("../models/songModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const uploadFiles = require("../utils/uploadFiles");
const Playlist = require("../models/playlistModel");

exports.uploadAndCreateSong = async (songInput) => {
  const songFile = await uploadFiles(
    {
      file: songInput.songBuffer,
      fileName: songInput.songFilename,
      folder: "songs/",
    },
    true,
  );

  const imgFile = await uploadFiles(
    {
      file: songInput.imgBuffer,
      fileName: songInput.imgFilename,
      folder: "songs/",
    },
    true,
  );

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
    const imgFile = await uploadFiles(
      {
        file: songInput.img.file,
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
    const songFile = await uploadFiles(
      {
        file: songInput.song.file,
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

exports.deleteSong = async (songInput) => {
  const song = await Song.findById(songInput.songId);

  if (!song) {
    throw new AppError("Song not found", 404);
  }

  // Check if the user is the owner of the song
  if (songInput.userId !== String(song.artist)) {
    throw new AppError("You are not owner of this song", 403);
  }

  // Delete song files from ImageKit and database
  const songFile = await File.findById(song.song);
  const imgFile = await File.findById(song.img);

  if (songFile && songFile.imagekitId) {
    await imagekitDelete(songFile.imagekitId);
    await File.findByIdAndDelete(songFile.id);
  }

  if (imgFile && imgFile.imagekitId) {
    await imagekitDelete(imgFile.imagekitId);
    await File.findByIdAndDelete(imgFile.id);
  }

  // Remove song from the database
  await Song.findByIdAndDelete(song.id);

  // Remove the song from user's songs list
  const user = await User.findById(songInput.userId).populate({
    path: "songs",
    select: "id name artist plays duration",
    populate: {path: "song img", select: "url"},
  });

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

// NOTE: similar to like/dislike