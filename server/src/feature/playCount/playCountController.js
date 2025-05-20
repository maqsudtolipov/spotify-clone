const Song = require("../../models/songModel");
const PlayCount = require("./playCountModel");

exports.migrateCounts = async (req, res, next) => {
  const allSongs = await Song.find().select("id plays");

  for (const song of allSongs) {
    const playCount = await PlayCount.create({
      totalPlays: song.plays,
      dailyPlays: [],
    });

    await Song.findByIdAndUpdate(song.id, {
      playCount: playCount._id,
    });
  }

  res.status(200).json({
    status: "success",
  });
};
