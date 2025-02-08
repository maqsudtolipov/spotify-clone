const playlistService = require("../services/playlistService");

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
    const playlistInput = {
      name: "Your Playlist",
      userId: req.user.id,
      libraryId: req.user?.library,
    };
    const {library, playlists} =
      await playlistService.createPlaylist(playlistInput);

    res.status(201).send({
      status: "success",
      library,
      playlists,
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
      libraryId: req.user?.library,
    };
    await playlistService.deletePlaylist(playlistInput);

    res.status(200).send({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};

exports.savePlaylistToLibrary = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params?.id,
      userId: req.user.id,
      libraryId: req.user?.library,
    };
    const {library} =
      await playlistService.savePlaylistToLibrary(playlistInput);

    res.status(200).send({
      status: "success",
      library,
    });
  } catch (e) {
    next(e);
  }
};

exports.removePlaylistFromLibrary = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params?.id,
      userId: req.user.id,
      libraryId: req.user?.library,
    };
    const {library} =
      await playlistService.removePlaylistFromLibrary(playlistInput);

    res.status(200).send({
      status: "success",
      library,
    });
  } catch (e) {
    next(e);
  }
};
