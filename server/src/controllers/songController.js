const AppError = require("../utils/AppError");
const songService = require("../services/songService");
const Song = require("../models/songModel");
const {
  updateTopSongsCache,
  getTopSongsCache,
  getNewestSongsCache,
  updateNewestSongsCache,
} = require("../cache/songsCache");
const playCountCache = require("../feature/playCount/playCountCache");
const PlayCount = require("../feature/playCount/playCountModel");

exports.uploadSong = async (req, res, next) => {
  try {
    if (!req.files.song || !req.files.img || !req.body.name) {
      return next(
        new AppError("All fields are required: song, img and name", 400),
      );
    }

    const songInput = {
      name: req.body.name,
      songBuffer: req.files.song[0].buffer,
      songFilename: req.files.song[0].filename,
      imgBuffer: req.files.img[0].buffer,
      imgFilename: req.files.img[0].filename,
      artistId: req.user.id,
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
      userId: req.user.id,
      songId: req.params.songId,
      playlistId: req.params.playlistId,
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
      userId: req.user.id,
      songId: req.params.songId,
      playlistId: req.params.playlistId,
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
    let songs = [];
    const topSongsCache = getTopSongsCache();

    if (topSongsCache.length >= 1) songs = topSongsCache;
    else songs = await updateTopSongsCache();

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
    let songs = [];
    const newestSongsCache = getNewestSongsCache();

    if (newestSongsCache.length >= 1) songs = newestSongsCache;
    else songs = await updateNewestSongsCache();

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
    const song = await Song.findById(req.params.id).populate(
      "playCount",
      "id updatedAt totalPlays",
    );

    playCountCache.increaseCount(song.id);
    const songCache = playCountCache.getPlayCount(song.id);

    const currentTime = Date.now();
    const updateTime = new Date(songCache.createdAt).getTime();

    if (currentTime - updateTime > 20 * 1000) {
      const newData = {
        date: updateTime,
        count: songCache.count,
      };

      await PlayCount.findByIdAndUpdate(song.playCount.id, {
        totalPlays: song.playCount.totalPlays + songCache.count,
        updatedAt: songCache.createdAt,
        $push: { dailyPlays: newData },
      });

      playCountCache.resetCount(song.id);
    }

    res.status(200).json({
      status: "success",
      message: "Song plays count updated",
    });
  } catch (e) {
    next(e);
  }
};
