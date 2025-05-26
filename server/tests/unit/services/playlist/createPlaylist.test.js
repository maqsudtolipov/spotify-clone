const Playlist = require("../../../../src/models/playlistModel");
const User = require("../../../../src/models/userModel");
const Library = require("../../../../src/models/libraryModel");
const createPlaylist = require("../../../../src/services/playlist/createPlaylist");

describe("createPlaylist", () => {
  it("should create a new playlist and update user data", async () => {
    jest.spyOn(Playlist, "create").mockResolvedValue({ id: "123" });
    jest.spyOn(Playlist, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        id: "123",
        name: "Your Playlist",
        user: { name: "Abc" },
        img: { url: "def.png" },
        createdAt: Date.now(),
      }),
    });
    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue(null);
    jest.spyOn(Library, "findByIdAndUpdate").mockResolvedValue(null);

    const res = await createPlaylist({
      name: "Your Playlist",
      userId: "123",
      libraryId: "123",
    });

    expect(Playlist.create).toHaveBeenCalledWith({
      name: "Your Playlist",
      user: "123",
    });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      expect.any(Object),
    );
    expect(Library.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      expect.any(Object),
    );
    expect(Playlist.findById).toHaveBeenCalledWith("123");

    console.log(res);

    expect(res.playlist).toMatchObject({
      id: "123",
      name: "Your Playlist",
      user: "Abc",
      img: "def.png",
      itemType: "playlist",
      createdAt: expect.any(Number),
    });
  });
});
