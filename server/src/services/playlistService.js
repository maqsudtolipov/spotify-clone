const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const {imagekitDelete} = require("../utils/ImageKit");
const File = require("../models/fileModel");
const Library = require("../models/libraryModel");
const uploadFiles = require("../utils/uploadFiles");
const filterLibraryItems = require("../utils/filterLibraryItems");

exports.getPlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("+isPublic")
    .populate([
      {path: "img", select: "url"},
      {
        path: "user",
        select: "name img",
        populate: [{path: "img", select: "url"}],
      },
    ]);

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
  const newPlaylist = await Playlist.create({
    name: playlistInput.name,
    user: playlistInput.userId,
  });

  const user = await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $addToSet: {playlists: newPlaylist.id},
    },
    {new: true},
  ).populate([{path: "playlists", select: "name"}]);

  const library = await Library.findByIdAndUpdate(
    playlistInput.libraryId,
    {
      $addToSet: {items: {refId: newPlaylist.id, itemType: "playlist"}},
    },
    {new: true},
  )
    .populate([
      {
        path: "items.refId",
        select: "name img user createdAt",
        populate: [
          {path: "user", select: "name", strictPopulate: false},
          {path: "img", select: "url"},
        ],
      },
    ])
    .lean();
  library.id = library._id;
  library.items = filterLibraryItems(library.items);

  return {library, playlists: user.playlists};
};

exports.updatePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
    .select("+isPublic +isLikedSongs")
    .populate([
      {path: "img", select: "url"},
      {
        path: "user",
        select: "name img",
        populate: [{path: "img", select: "url"}],
      },
    ]);

  if (!playlist || playlist.user.id !== playlistInput.userId) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  let imgFile = playlist.img.id;
  if (playlistInput.imgBuffer) {
    const uploadedFile = uploadFiles(
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
    .select("+isPublic +isLikedSongs")
    .populate([
      {path: "img", select: "id fileId isDefault"},
      {path: "user", select: "name"},
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
    {likedPlaylists: playlistInput.playlistId},
    {$pull: {likedPlaylists: playlistInput.playlistId}},
  );

  // Remove playlist from all libraries
  await Library.updateMany(
    {"items.refId": playlistInput.playlistId},
    {$pull: {items: {refId: playlistInput.playlistId}}},
  );
};

exports.savePlaylistToLibrary = async (playlistInput) => {
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

  const user = await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $addToSet: {
        likedPlaylists: playlist.id,
      },
    },
    {
      new: true,
    },
  ).select("likedPlaylists");

  const library = await Library.findByIdAndUpdate(
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
  )
    .populate([
      {
        path: "items.refId",
        select: "name img user createdAt",
        populate: [
          {path: "user", select: "name", strictPopulate: false},
          {path: "img", select: "url"},
        ],
      },
    ])
    .lean();
  library.id = library._id;
  library.items = filterLibraryItems(library.items);

  return {
    library,
    likedPlaylists: user.likedPlaylists,
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

  const user = await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $pull: {
        likedPlaylists: playlist.id,
      },
    },
    {
      new: true,
    },
  ).select("likedPlaylists");

  const library = await Library.findByIdAndUpdate(
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
  )
    .populate([
      {
        path: "items.refId",
        select: "name img user createdAt",
        populate: [
          {path: "user", select: "name", strictPopulate: false},
          {path: "img", select: "url"},
        ],
      },
    ])
    .lean();
  library.id = library._id;
  library.items = filterLibraryItems(library.items);

  return {
    library,
    likedPlaylists: user.likedPlaylists,
  };
};
