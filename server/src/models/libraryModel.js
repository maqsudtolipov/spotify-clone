const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    items: [
      {
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          pathRef: "itemType",
          required: [true, "Please provide a refId"],
        },
        itemType: {
          type: String,
          required: [true, "Item type is required: Playlist or User"],
          enum: ["Playlist", "User"],
        },
        isPinned: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
