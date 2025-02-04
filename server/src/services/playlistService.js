const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const {imagekitUpload, imagekitDelete} = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Library = require("../models/libraryModel");
const uploadImgFile = require("../utils/uploadImgFile");

exports.getPlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("isPublic")
    .populate([
      {path: "img", select: "url"},
      {path: "user", select: "name"},
    ]);

  const isPrivatePlaylist =
    !playlist.isPublic && playlist.user.id !== playlistInput.userId;
  if (!playlist || isPrivatePlaylist) {
    throw new AppError("Playlist not found", 404);
  }

  playlist.isPublic = undefined;
  return playlist;
};

exports.createPlaylist = async (playlistInput) => {
  const newPlaylist = await Playlist.create({
    name: playlistInput.name,
    user: playlistInput.userId,
  });

  await User.findByIdAndUpdate(playlistInput.userId, {
    $addToSet: {playlists: newPlaylist.id},
  });

  await Library.findByIdAndUpdate(playlistInput.libraryId, {
    $addToSet: {items: {refId: newPlaylist.id, itemType: "playlist"}},
  });

  return newPlaylist;
};

exports.updatePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("isPublic isLikedSongs")
    .populate([
      {path: "img", select: "url"},
      {path: "user", select: "name"},
    ]);

  const notPersonalPlaylist = playlist.user.id !== playlistInput.userId;
  if (!playlist || notPersonalPlaylist) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  let imgFile = uploadImgFile(
    {
      file: playlistInput.imgBuffer,
      fileName: playlistInput.imgFilename,
      folder: "playlists/",
    },
    playlist.img.isDefault,
    playlist.img.fileId,
    playlist.img.id,
  );

  return await Playlist.findByIdAndUpdate(
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
};

exports.deletePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("isPublic isLikedSongs")
    .populate([
      {path: "img", select: "fileId isDefault"},
      {path: "user", select: "name"},
    ]);

  const notPersonalPlaylist = playlist.user.id !== playlistInput.userId;
  if (!playlist || notPersonalPlaylist) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  // Delete the old img if it's not default
  if (!playlist.img.isDefault) {
    await imagekitDelete(playlist.img.fileId);
    await File.findByIdAndDelete(playlist.img.id);
  }

  await Playlist.findByIdAndDelete(playlistInput.playlistId);
  await Library.findByIdAndUpdate(playlistInput.playlistId, {
    $pull: {items: {refId: playlistInput.playlistId, itemType: "playlist"}},
  });
};

exports.savePlaylistToLibrary = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId).select(
    "+isPublic +isLikedSongs",
  );

  const isPrivatePlaylist =
    !playlist.isPublic && String(playlist.user) !== playlistInput.userId;
  if (!playlist || isPrivatePlaylist) {
    throw new AppError("Playlist not found", 404);
  }

  const isPersonalPlaylist = String(playlist.user) === playlistInput.userId;
  if (playlist.isLikedSongs || isPersonalPlaylist) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  await User.findByIdAndUpdate(playlistInput.userId, {
    $addToSet: {
      likedPlaylists: playlist.id,
    },
  });

  const updatedLibrary = await Library.findByIdAndUpdate(
    playlistInput.libraryId,
    {
      $addToSet: {
        items: {
          refId: playlist.id,
          itemType: "playlist",
        },
      },
    },
    {new: true},
  );

  return {
    updatedLibrary,
  };
};

exports.removePlaylistFromLibrary = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId).select(
    "+isPublic +isLikedSongs",
  );

  const isPrivatePlaylist =
    !playlist.isPublic && String(playlist.user) !== playlistInput.userId;
  if (!playlist || isPrivatePlaylist) {
    throw new AppError("Playlist not found", 404);
  }

  const isPersonalPlaylist = String(playlist.user) === playlistInput.userId;
  if (playlist.isLikedSongs || isPersonalPlaylist) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  await User.findByIdAndUpdate(playlistInput.userId, {
    $pull: {
      likedPlaylists: playlist.id,
    },
  });

  const updatedLibrary = await Library.findByIdAndUpdate(
    playlistInput.libraryId,
    {
      $pull: {
        items: {
          refId: playlist.id,
          itemType: "playlist",
        },
      },
    },
    {new: true},
  );

  return {
    updatedLibrary,
  };
};
