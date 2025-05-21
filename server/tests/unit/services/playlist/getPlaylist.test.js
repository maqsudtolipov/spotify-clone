const getPlaylist = require("../../../../src/services/playlist/getPlaylist");

describe("getPlaylist", () => {
  it("should throw CastError if id is invalid", async () => {
    const error = await getPlaylist();

    console.log(error);
  });

  it("should throw 404 if playlist does not exist", () => {});

  it("should throw 404 if playlist is private and not owned by user", () => {});

  it("should return playlist data", () => {});
});
