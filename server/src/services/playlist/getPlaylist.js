const Playlist = require("../../models/playlistModel");
const AppError = require("../../utils/AppError");

// TODO: add pagination and querying as option
const getPlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
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

  playlist.isPublic = undefined;
  return playlist;
};

module.exports = getPlaylist;
