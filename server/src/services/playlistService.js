const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { imagekitDelete } = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Library = require("../models/libraryModel");
const uploadFiles = require("../utils/uploadFiles");

// TODO: add pagination and querying as option
exports.getPlaylist = async (playlistInput) => {
  const playlist = await Playlist.findOne({
    _id: playlistInput.playlistId,
    isDeleted: false,
  })
    .select("+isPublic")
    .populate([
      { path: "img", select: "url" },
      {
        path: "user",
        select: "name img role",
        populate: [{ path: "img", select: "url" }],
      },
      {
        path: "songs",
        match: { isDeleted: false },
        select: "id name artist plays duration",
        populate: [
          { path: "song img", select: "url" },
          {
            path: "artist",
            select: "id name",
          },
          { path: "playCount", select: "totalPlays" },
        ],
      },
    ]);

  if (
    !playlist ||
    (!playlist.isPublic && playlist.user.id !== playlistInput.userId)
  ) {
    throw new AppError("Playlist not found", 404);
  }

  const result = playlist.toObject();

  result.isPublic = undefined;
  result.length = result.songs.length;
  result.duration = result.songs.reduce((acc, cur) => acc + cur.duration, 0);

  return result;
};

exports.createPlaylist = async (playlistInput) => {
  // Create new playlist
  const newPlaylist = await Playlist.create({
    name: playlistInput.name,
    user: playlistInput.userId,
  });

  // Add playlist to users playlists
  await User.findByIdAndUpdate(playlistInput.userId, {
    $addToSet: { playlists: newPlaylist.id },
  });

  // Save playlist to user's library
  await Library.findByIdAndUpdate(playlistInput.libraryId, {
    $addToSet: { items: { refId: newPlaylist.id, itemType: "playlist" } },
  });

  // Populate created playlist
  const playlist = await Playlist.findById(newPlaylist.id).populate([
    {
      path: "user",
      select: "name",
    },
    {
      path: "img",
      select: "url",
    },
  ]);

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

exports.updatePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findOne({
    _id: playlistInput.playlistId,
    isDeleted: false,
    isLikedSongs: false,
  })
    .select("+isPublic +isLikedSongs")
    .populate([
      { path: "img", select: "url isDefault fileId" },
      { path: "user", select: "id" },
    ]);

  if (!playlist || playlist.user.id !== playlistInput.userId) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  // Upload req img to cloud and save to DB
  let imgFile = playlist.img.id;
  if (playlistInput.imgBuffer) {
    const uploadedFile = await uploadFiles(
      {
        file: playlistInput.imgBuffer,
        fileName: playlistInput.imgFilename,
        folder: "playlists/",
      },
      playlist.img.isDefault,
      playlist.img.fileId,
      playlist.img.id,
    );
    imgFile = uploadedFile.id;
  }

  return Playlist.findByIdAndUpdate(
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
  ).populate([
    {
      path: "user",
      select: "name",
    },
    {
      path: "img",
      select: "url",
    },
  ]);
};

exports.deletePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findOne({
    _id: playlistInput.playlistId,
    isDeleted: false,
    isLikedSongs: false,
  })
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
  await Playlist.findByIdAndUpdate(playlistInput.playlistId, {
    isDeleted: true,
    deletedAt: Date.now(),
  });
};

exports.savePlaylistToLibrary = async (playlistInput) => {
  const playlist = await Playlist.findOne({
    _id: playlistInput.playlistId,
    isDeleted: false,
  })
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
  const playlist = await Playlist.findOne({
    _id: playlistInput.playlistId,
    isDeleted: false,
  }).select("+isPublic +isLikedSongs");

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
