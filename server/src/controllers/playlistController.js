const playlistService = require("../services/playlistService");

exports.createPlaylist = async (req, res, next) => {
  try {
    // Validate input fields

    const playlistInput = {
      userId: req.user.id,
    };

    const playlist = await playlistService.createPlaylist(playlistInput);

    // Send status
    res.status(201).send({
      status: "success",
      playlist,
    });
  } catch (e) {
    next(e);
  }
};
