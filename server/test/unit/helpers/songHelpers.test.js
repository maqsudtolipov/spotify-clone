const Song = require("../../../src/models/songModel");
const AppError = require("../../../src/utils/AppError");
const Playlist = require("../../../src/models/playlistModel");
const songHelpers = require("../../../src/helpers/songHelpers");

jest.mock("../../../src/models/songModel");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("songHelpers", () => {
  describe("addOrRemoveSongFromPlaylist function", () => {
    it("should throw 404 error if song does not exist", async () => {
      jest.spyOn(Song, "findById").mockResolvedValue(null);

      const error = await songHelpers
        .addOrRemoveSongFromPlaylist("songId", "playlistId", "userId", "add")
        .catch((e) => e);

      expect(Song.findById).toHaveBeenCalledWith("songId");
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Song not found");
    });

    it("should throw 404 error if playlist does not exist", async () => {
      jest.spyOn(Song, "findById").mockReturnValue({
        select: jest.fn().mockReturnValue({name: "song"}),
      });
      jest.spyOn(Playlist, "findOne").mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const error = await songHelpers
        .addOrRemoveSongFromPlaylist("songId", "playlistId", "userId", "add")
        .catch((e) => e);

      expect(Playlist.findOne).toHaveBeenCalledWith({
        _id: "playlistId",
        songs: {
          $ne: "songId",
        },
      });
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Playlist not found");
    });

    it("should throw 404 if playlist does not belong to user", async () => {
      jest.spyOn(Song, "findById").mockResolvedValue({name: "song"});
      jest.spyOn(Playlist, "findOne").mockReturnValue({
        select: jest
          .fn()
          .mockResolvedValue({name: "playlist", user: "differentId"}),
      });

      const error = await songHelpers
        .addOrRemoveSongFromPlaylist("songId", "playlistId", "userId", "add")
        .catch((e) => e);

      expect(Playlist.findOne).toHaveBeenCalledWith({
        _id: "playlistId",
        songs: {
          $ne: "songId",
        },
      });
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Playlist not found");
    });

    it("should return 403 if playlist is likedSongs", async () => {
      jest.spyOn(Song, "findById").mockResolvedValue({name: "song"});
      jest.spyOn(Playlist, "findOne").mockReturnValue({
        select: jest.fn().mockResolvedValue({
          name: "playlist",
          user: "userId",
          isLikedSongs: true,
        }),
      });

      const error = await songHelpers
        .addOrRemoveSongFromPlaylist("songId", "playlistId", "userId", "add")
        .catch((e) => e);

      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe(
        "You don't have permission to perform this action",
      );
    });

    it("should add song inside playlist", async () => {
      jest
        .spyOn(Song, "findById")
        .mockResolvedValue({id: "songId", name: "song", duration: 120});
      jest.spyOn(Playlist, "findOne").mockReturnValue({
        select: jest
          .fn()
          .mockResolvedValue({id: "playlistId", user: "userId", duration: 0}),
      });
      jest.spyOn(Playlist, "findByIdAndUpdate").mockResolvedValue(true);

      await songHelpers.addOrRemoveSongFromPlaylist(
        "songId",
        "playlistId",
        "userId",
        "add",
      );

      expect(Playlist.findByIdAndUpdate).toHaveBeenCalledWith("playlistId", {
        $addToSet: {songs: "songId"},
        $inc: {
          duration: 120,
          length: 1,
        },
      });
    });

    it("should remove song from playlist", async () => {
      jest
        .spyOn(Song, "findById")
        .mockResolvedValue({id: "songId", name: "song", duration: 120});
      jest.spyOn(Playlist, "findOne").mockReturnValue({
        select: jest
          .fn()
          .mockResolvedValue({id: "playlistId", user: "userId"}),
      });
      jest.spyOn(Playlist, "findByIdAndUpdate").mockResolvedValue(true);

      await songHelpers.addOrRemoveSongFromPlaylist(
        "songId",
        "playlistId",
        "userId",
        "remove",
      );

      expect(Playlist.findByIdAndUpdate).toHaveBeenCalledWith("playlistId", {
        $pull: {songs: "songId"},
        $inc: {
          duration: -120,
          length: -1,
        },
      });
    });
  });
});
