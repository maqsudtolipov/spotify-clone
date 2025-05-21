const Playlist = require("../../models/playlistModel");
const User = require("../../models/userModel");
const Library = require("../../models/libraryModel");

const createPlaylist = async (playlistInput) => {
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

module.exports = createPlaylist;
