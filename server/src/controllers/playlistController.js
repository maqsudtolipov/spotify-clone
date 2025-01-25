const playlistService = require("../services/playlistService");

exports.createPlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      name: "Your Playlist",
      img: "67950683dd94942631985824", // Default img id
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
