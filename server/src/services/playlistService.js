const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { imagekitDelete } = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Library = require("../models/libraryModel");

exports.deletePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("+isPublic +isLikedSongs")
    .populate([
      { path: "img", select: "id fileId isDefault" },
      { path: "user", select: "name" },
    ]);

  if (!playlist || playlist.user.id !== playlistInput.userId) {
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

  // Delete the playlist
  await Playlist.findByIdAndDelete(playlistInput.playlistId);

  // Remove the playlist from Users' likedSongs array
  await User.updateMany(
    { likedPlaylists: playlistInput.playlistId },
    { $pull: { likedPlaylists: playlistInput.playlistId } },
  );

  // Remove playlist from all libraries
  await Library.updateMany(
    { "items.refId": playlistInput.playlistId },
    { $pull: { items: { refId: playlistInput.playlistId } } },
  );
};

exports.savePlaylistToLibrary = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("+isPublic +isLikedSongs")
    .populate([
      {
        path: "user",
        select: "name",
      },
      {
        path: "img",
        select: "url",
      },
    ]);

  if (
    !playlist ||
    (!playlist.isPublic && String(playlist.user) !== playlistInput.userId)
  ) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs || String(playlist.user) === playlistInput.userId) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  // Add playlist id to users liked songs arr
  await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $addToSet: {
        likedPlaylists: playlist.id,
      },
    },
    {
      new: true,
    },
  );

  // Add playlist to users library
  await Library.findByIdAndUpdate(playlistInput.libraryId, {
    $addToSet: {
      items: {
        refId: playlist.id,
        itemType: "playlist",
      },
    },
  });

  return {
    playlist: {
      id: playlist.id,
      name: playlist.name,
      user: playlist.user.name,
      img: playlist.img.url,
      itemType: "playlist",
      createdAt: playlist.createdAt,
    },
  };
};

exports.removePlaylistFromLibrary = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId).select(
    "+isPublic +isLikedSongs",
  );

  if (
    !playlist ||
    (!playlist.isPublic && String(playlist.user) !== playlistInput.userId)
  ) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs || String(playlist.user) === playlistInput.userId) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  // Remove playlist from users liked songs arr
  await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $pull: {
        likedPlaylists: playlist.id,
      },
    },
    {
      new: true,
    },
  );

  // Remove playlist from users library
  await Library.findByIdAndUpdate(playlistInput.libraryId, {
    $pull: {
      items: {
        refId: playlist.id,
        itemType: "playlist",
      },
    },
  });
};
