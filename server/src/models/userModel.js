const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Playlist = require("./playlistModel");
const Library = require("./libraryModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: [3, "Name must be at least 2 characters long"],
      maxLength: [24, "Name must be at most 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email address"],
      unique: [true, "User with this email already exists"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      select: false,
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: [true, "Please provide an image"],
    },
    color: {
      type: String,
      required: [true, "Please provide a color"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "artist"],
      default: "user",
      select: false,
    },
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      unique: [true, "User can only get one library"],
    },
    likedPlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followersCount: {
      type: Number,
      required: true,
      default: 0,
    },
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followingsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    songs: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Song",
        },
      ],
    },
    likedSongs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxLength: [16, "Password must be at most 16 characters long"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character ($, !, %, &, *).",
      ],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide a password"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Passwords do not match",
      },
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

// Changes
userSchema
  .path("color")
  .default(
    () =>
      "#" +
      ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0") +
      "4d",
  );

// Create likedSongs playlist on newUsers
userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  // Create liked songs playlist for the user
  const likedSongsPlaylist = await Playlist.create({
    name: "Liked Songs",
    img: "67950683dd94942631985824", // Default img id
    user: this.id,
    isPublic: false,
    isLikedSongs: true,
  });
  this.likedSongs = likedSongsPlaylist.id;

  // Create user's Library and add liked songs inside it
  const library = await Library.create({
    items: [
      {
        refId: likedSongsPlaylist.id,
        itemType: "playlist",
      },
    ],
  });
  this.library = library.id;

  next();
});

// Remove songs from users
userSchema.pre("save", async function (next) {
  if (this.role === "artist") return next();

  this.songs = undefined;

  next();
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// Exports
const User = mongoose.model("User", userSchema);

module.exports = User;
