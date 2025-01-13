const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      type: String,
      default:
        "https://ik.imagekit.io/8cs4gpobr/users/default.jpeg?updatedAt=1736317738783",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      select: false,
    },
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

// Methods
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
