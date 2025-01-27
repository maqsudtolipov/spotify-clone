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
      userId: req.user.id,
      playlistId: req.params.id,
      name: req.body.name,
      description: req.body.description,
      imgBuffer: req.files.img[0].buffer,
      imgFilename: req.files.img[0].filename,
      isPublic: req.body.isPublic,
    };

    const updatedPlaylist = await playlistService.updatePlaylist(playlistInput);

    res.status(200).send({
      status: "success",
      updatedPlaylist,
    });
  } catch (e) {
    next(e);
  }
};
