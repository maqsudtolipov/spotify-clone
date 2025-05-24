const Playlist = require("../../models/playlistModel");
const AppError = require("../../utils/AppError");
const uploadFiles = require("../../utils/uploadFiles");
const uploadFile = require("../file/uploadFile");

const updatePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId)
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

  const newFileId = await uploadFile(
    playlist.img.id,
    playlistInput.imgFile,
    "playlists/",
  );
  const imgFile = newFileId || playlist.img.id;

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

module.exports = updatePlaylist;
