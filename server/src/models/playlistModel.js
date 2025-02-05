const mongoose = require("mongoose");
const {getCache, setCache} = require("../services/cacheService");
const File = require("./fileModel");
const generateRandomColor = require("../utils/generateRandomColor");

// TODO: add length of all songs and count of songs

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a playlist name"],
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [24, "Name must be at most 24 characters long"],
    },
    description: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name must be at most 50 characters long"],
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      required: [true, "Please provide a color"],
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
      select: false,
    },
    isLikedSongs: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
  },
);

playlistSchema
  .path("color")
  .default(userSchema.path("color").default(generateRandomColor()));

const getDefaultPlaylistImgId = async (type = "playlist") => {
  const defaultFiles = {
    likedSongs: {
      cacheKey: "defaultLikedSongsId",
      fileId: "likedSongs",
      name: "likedSongs.jpeg",
      filePath: "spotify/playlists/likedSongs.jpeg",
      url: "https://ik.imagekit.io/8cs4gpobr/spotify/playlists/likedSongs.jpeg",
    },
    playlist: {
      cacheKey: "defaultPlaylistImgId",
      fileId: "playlist",
      name: "defaultPlaylist.jpeg",
      filePath: "spotify/playlists/defaultPlaylist.jpeg",
      url: "https://ik.imagekit.io/8cs4gpobr/spotify/playlists/defaultPlaylist.jpeg",
    },
  };

  if (!defaultFiles[type]) return null; // Handle unknown types

  const {cacheKey, fileId, name, filePath, url} = defaultFiles[type];

  let cachedImgId = getCache(cacheKey);
  if (cachedImgId) return cachedImgId;

  let defaultFile = await File.findOne({fileId});
  if (!defaultFile) {
    defaultFile = await File.create({
      fileId,
      name,
      size: 0,
      filePath,
      url,
      isDefault: true,
    });
    setCache(cacheKey, defaultFile.id);
  }

  return defaultFile.id;
};

playlistSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const defaultPlaylistImgId = await getDefaultPlaylistImgId(
    this.isLikedSongs ? "likedSongs" : "playlist",
  );
  this.img = defaultPlaylistImgId;
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
