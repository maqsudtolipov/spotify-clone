const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../helpers/databaseHelpers");
const app = require("../../src/app");
const createUsersAndLogin = require("../helpers/createUsersAndLogin");
const request = require("supertest");
const Playlist = require("../../src/models/playlistModel");
const User = require("../../src/models/userModel");

let server;
beforeAll(async () => {
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await cleanupDatabaseAndDisconnect();
  server.close();
});

describe("Playlist Routes", () => {
  // ORDER: create => get => update => delete
  let userIds, accessToken, playlistId;

  beforeAll(async () => {
    // Login user
    const res = await createUsersAndLogin(
      [
        {
          name: "Sunny",
          email: "sunny@example.com",
          password: "Pa$$1234",
          passwordConfirm: "Pa$$1234",
        },
      ],
      0,
    );

    userIds = res.userIds;
    accessToken = res.accessToken;
  });

  describe("POST /playlists - create playlist", () => {
    it("should create a new playlist", async () => {
      const res = await request(app)
        .post(`/api/playlists/`)
        .set("Cookie", [`accessToken=${accessToken}`]);
      playlistId = res.body.playlist.id;

      // Check response body
      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.playlist).toMatchObject({
        name: "Your Playlist",
        songs: [],
      });

      // Check database updates
      const newPlaylist = await Playlist.findById(playlistId);
      expect(newPlaylist).toBeTruthy();

      const updatedUser = await User.findById(userIds[0]);
      expect(updatedUser.playlists[0].toString()).toEqual(playlistId);
    });
  });

  describe("GET /playlists/:id - read playlist", () => {
    it("should return playlist details", async () => {
      const res = await request(app)
        .get(`/api/playlists/${playlistId}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.playlist).toBeTruthy();
    });
  });
});
