const playlistService = require("../services/playlistService");
const { getCache, setCache } = require("../services/cacheService");
const File = require("../models/fileModel");
const { logout } = require("./authController");

const getDefaultPlaylistImgId = async () => {
  let cachedImgId = getCache("defaultPlaylistImgId");
  if (cachedImgId) return cachedImgId;

  let defaultFile = await File.findOne({ fileId: "playlist" });

  if (!defaultFile) {
    defaultFile = await File.create({
      fileId: "playlist",
      name: "defaultPlaylist.jpeg",
      size: 0,
      filePath: "spotify/playlists/defaultPlaylist.jpeg",
      url: "https://ik.imagekit.io/8cs4gpobr/spotify/playlists/defaultPlaylist.jpeg",
      isDefault: true,
    });

    setCache("defaultPlaylistImgId", defaultFile.id);
  }

  return defaultFile.id;
};

exports.getPlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
    };
    const playlist = await playlistService.getPlaylist(playlistInput);

    res.status(200).send({
      status: "success",
      playlist,
    });
  } catch (e) {
    next(e);
  }
};

exports.createPlaylist = async (req, res, next) => {
  try {
    const defaultPlaylistImgId = await getDefaultPlaylistImgId();

    const playlistInput = {
      name: "Your Playlist",
      img: defaultPlaylistImgId,
      userId: req.user.id,
    };
    const playlist = await playlistService.createPlaylist(playlistInput);

    res.status(201).send({
      status: "success",
      playlist,
    });
  } catch (e) {
    next(e);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    // FIXME: Too complicated
    const playlistInput = {
      userId: req.user?.id,
      playlistId: req.params?.id,
      name: req.body?.name,
      description: req.body?.description,
      imgBuffer: req.files?.img?.[0]?.buffer,
      imgFilename: req.files?.img?.[0]?.filename,
      isPublic: req.body?.isPublic,
    };
    const updatedPlaylist = await playlistService.updatePlaylist(playlistInput);

    res.status(200).send({
      status: "success",
      playlist: updatedPlaylist,
    });
  } catch (e) {
    next(e);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
    };
    await playlistService.deletePlaylist(playlistInput);

    res.status(200).send({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
