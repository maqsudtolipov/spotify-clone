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

exports.updatePlaylist = async (req, res, next) => {
  try {
    const playlistInput = {
      playlistId: req.params.id,
      userId: req.user.id,
      name: req.body.name,
      img: req.params.img,
      description: req.params.description,
      isPublic: req.params.isPublic,
    };

    await playlistService.updatePlaylist(playlistInput);

    res.status(200).send({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
