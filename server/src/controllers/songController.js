const AppError = require("../utils/AppError");
const songService = require("../services/songService");
const Song = require("../models/songModel");
const {
  updateTopSongsCache,
  getTopSongsCache,
  getNewestSongsCache,
  updateNewestSongsCache,
} = require("../cache/songsCache");
const playCountCache = require("../cache/playCountCache");
const PlayCount = require("../models/playCountModel");
const redisClient = require("../cache/redisClient");

exports.uploadSong = async (req, res, next) => {
  try {
    const songInput = {
      name: req.body.name,
      artistId: req.user.id,
      songBuffer: req.files.song[0].buffer,
      songFilename: req.files.song[0].filename,
      imgBuffer: req.files.img[0].buffer,
      imgFilename: req.files.img[0].filename,
      duration: req.files.song[0].duration,
    };
    const songs = await songService.uploadAndCreateSong(songInput);

    res.status(201).json({ status: "success", songs });
  } catch (e) {
    next(e);
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      artistId: req.user.id,
      name: req.body?.name || undefined,
      img: req.files.img
        ? {
            file: req.files.img[0].buffer,
            fileName: req.files.img[0].filename,
          }
        : null,
      song: req.files.song
        ? {
            file: req.files.song[0].filename,
            fileName: req.files.song[0].filename,
            duration: req.files.song[0].duration,
          }
        : null,
    };
    const songs = await songService.updateSong(songInput);

    res.status(200).json({ status: "success", songs });
  } catch (e) {
    next(e);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      userId: req.user.id,
    };
    const songs = await songService.deleteSong(songInput);

    res.status(200).json({ status: "success", songs });
  } catch (e) {
    next(e);
  }
};

exports.like = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      likedSongsId: req.user.likedSongs,
    };
    const likedSongs = await songService.likeSong(songInput);

    res.status(200).json({
      status: "success",
      likedSongs,
    });
  } catch (e) {
    next(e);
  }
};

exports.dislike = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.id,
      likedSongsId: req.user.likedSongs,
    };
    const likedSongs = await songService.dislikeSong(songInput);

    res.status(200).json({
      status: "success",
      likedSongs,
    });
  } catch (e) {
    next(e);
  }
};

exports.addSongToPlaylist = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.songId,
      playlistId: req.params.playlistId,
      userId: req.user.id,
    };
    await songService.addSongToPlaylist(songInput);

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};

exports.removeSongFromPlaylist = async (req, res, next) => {
  try {
    const songInput = {
      songId: req.params.songId,
      playlistId: req.params.playlistId,
      userId: req.user.id,
    };
    await songService.removeSongFromPlaylist(songInput);

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};

exports.getTopSongs = async (req, res, next) => {
  try {
    let songs = await getTopSongsCache();

    res.status(200).json({
      status: "success",
      songs,
    });
  } catch (e) {
    next(e);
  }
};

exports.getNewestSongs = async (req, res, next) => {
  try {
    let songs = await getNewestSongsCache();

    res.status(200).json({
      status: "success",
      songs,
    });
  } catch (e) {
    next(e);
  }
};

// Plays
exports.play = async (req, res, next) => {
  try {
    const songId = req.params.id;
    const song = await Song.findById(songId).populate(
      "playCount",
      "id updatedAt totalPlays",
    );

    const redisKey = `playcount:${songId}`;

    let playData = await redisClient.hGetAll(redisKey);

    if (!playData.count) {
      await redisClient.hSet(redisKey, {
        count: 1,
        createdAt: Date.now().toString(),
      });
    } else {
      await redisClient.hIncrBy(redisKey, "count", 1);
    }

    playData = await redisClient.hGetAll(redisKey);

    const currentTime = Date.now();
    const createdAt = parseInt(playData.createdAt, 10);
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (currentTime - createdAt > twentyFourHours) {
      const count = parseInt(playData.count, 10);

      const newData = {
        date: createdAt,
        count,
      };

      await PlayCount.findByIdAndUpdate(song.playCount.id, {
        $inc: { totalPlays: count },
        updatedAt: new Date(createdAt),
        $push: { dailyPlays: newData },
      });

      await redisClient.del(redisKey);
    }

    res.status(200).json({
      status: "success",
      message: "Song plays count updated",
    });
  } catch (e) {
    next(e);
  }
};
