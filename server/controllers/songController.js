const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const { log } = require('console');
const Song = require('../models/songModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // console.log(file);
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else if (file.mimetype.split('/')[0] === 'audio') {
    cb(null, true);
  } else {
    cb(new Error('Only images and audios are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });

exports.uploadSongFiles = upload.fields([
  {
    name: 'song',
    maxCount: 1,
  },
  {
    name: 'img',
    maxCount: 1,
  },
]);

exports.resizeSongImg = catchAsync(async (req, res, next) => {
  if (!req.files.img) return next();

  req.files.img[0].filename = `img-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.files.img[0].buffer)
    .resize(520, 520)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/songs/${req.files.img[0].filename}`);

  next();
});

exports.saveSongFile = catchAsync(async (req, res, next) => {
  if (!req.files.song) return next();

  req.files.song[0].filename = `song-${req.user.id}-${Date.now()}.mp3`;
  fs.writeFileSync(
    `public/songs/${req.files.song[0].filename}`,
    req.files.song[0].buffer
  );

  next();
});

exports.getAllSongs = catchAsync(async (req, res, next) => {
  const songs = await Song.find();

  const serverUrl = `${req.protocol}://${req.get('host')}/`;
  songs.map((song) => {
    song.song = serverUrl + song.song;
    song.img = serverUrl + song.img;
  });

  res.status(200).json({
    status: 'success',
    results: songs.length,
    data: {
      songs,
    },
  });
});

exports.getSong = catchAsync(async (req, res, next) => {
  // $inc increases plays field every time this route hits
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    { $inc: { plays: 1 } },
    { new: true }
  );

  if (!song) return next(new AppError('No song found with given id', 404));

  const serverUrl = `${req.protocol}://${req.get('host')}/`;
  song.song = `${serverUrl}public/songs/${song.song}`;
  song.img = `${serverUrl}public/songs/${song.img}`;

  res.status(200).json({
    status: 'success',
    data: {
      song,
    },
  });
});

exports.createSong = catchAsync(async (req, res, next) => {
  // 1) Modify req.boy
  req.body.song = req.files.song[0].filename;
  req.body.img = req.files.img[0].filename;
  req.body.artist = req.user.id;

  const newSong = await Song.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      song: newSong,
    },
  });
});

exports.updateSong = catchAsync(async (req, res, next) => {
  // Prevent updating song file
  if (req.body.song) return next(new Error('You can not update a song file'));

  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!song) return next(new AppError('No song found with given id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      song,
    },
  });
});

exports.deleteSong = catchAsync(async (req, res, next) => {
  const song = await Song.findByIdAndDelete(req.params.id);

  if (!song) return next(new AppError('No song found with given id', 404));

  // delete song file from storage
  fs.unlink(`./songs/${song.song}`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
