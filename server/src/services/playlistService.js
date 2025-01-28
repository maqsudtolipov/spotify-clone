const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { imagekitUpload, imagekitDelete } = require("../utils/ImageKit");
const File = require("../models/fileModel");

exports.getPlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("isPublic")
    .populate("img", "url")
    .populate("user", "name");

  if (
    !playlist ||
    (!playlist.isPublic && playlist.user.id !== playlistInput.userId)
  ) {
    throw new AppError("Playlist not found", 404);
  }

  playlist.isPublic = undefined;

  return playlist;
};

exports.createPlaylist = async (playlistInput) => {
  // Create a new playlist
  const newPlaylist = await Playlist.create({
    name: playlistInput.name,
    img: playlistInput.img,
    user: playlistInput.userId,
  });

  // Attach playlist id to user playlists
  await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $addToSet: {
        playlists: newPlaylist.id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  // TODO: Add playlists to user's library

  return newPlaylist;
};

exports.updatePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("+isLikedSongs")
    .populate("img", "fileId isDefault");

  if (!playlist) {
    throw new AppError("Playlist not found", 404);
  }

  if (String(playlist.user) !== playlistInput.userId || playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  let imgFile;
  if (playlistInput.imgFilename) {
    // Upload new img
    const imgUpload = await imagekitUpload({
      file: playlistInput.imgBuffer,
      fileName: playlistInput.imgFilename,
      folder: "playlists/",
    });
    imgFile = await File.create(imgUpload);

    // Delete the old img if it's not default
    if (!playlist.img.isDefault) {
      await imagekitDelete(playlist.img.fileId);
      await File.findByIdAndDelete(playlist.img.id);
    }
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistInput.playlistId,
    {
      name: playlistInput.name,
      img: imgFile,
      description: playlistInput.description,
      isPublic: playlistInput.isPublic,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedPlaylist;
};

exports.deletePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("+isLikedSongs")
    .populate("img", "fileId isDefault");

  if (!playlist) {
    throw new AppError("Playlist not found", 404);
  }

  if (String(playlist.user) !== playlistInput.userId || playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  // Delete the old img if it's not default
  if (!playlist.img.isDefault) {
    await imagekitDelete(playlist.img.fileId);
    await File.findByIdAndDelete(playlist.img.id);
  }

  await Playlist.findByIdAndDelete(playlistInput.playlistId);
};
