const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../helpers/databaseHelpers");
const app = require("../../src/app");
const createUsersAndLogin = require("../helpers/createUsersAndLogin");
const request = require("supertest");
const Playlist = require("../../src/models/playlistModel");
const User = require("../../src/models/userModel");
const File = require("../../src/models/fileModel");
const fs = require("node:fs");
const { resolve } = require("node:path");

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
  let loggedInUsers, userIds, accessTokens, playlistId, privatePlaylistId;

  beforeAll(async () => {
    // Login user
    const res = await createUsersAndLogin([
      {
        name: "Sunny",
        email: "sunny@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      },
      {
        name: "Kai",
        email: "kai@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      },
    ]);

    userIds = res.userIds;
    accessTokens = res.accessTokens;
    loggedInUsers = res.loggedInUsers;

    // Create playlist
    const playlist = await request(app)
      .post(`/api/playlists/`)
      .set("Cookie", [`accessToken=${accessTokens[0]}`]);
    playlistId = playlist.body.playlist.id;

    // Create private playlist
    const createdPrivatePlaylist = await request(app)
      .post(`/api/playlists/`)
      .set("Cookie", [`accessToken=${accessTokens[1]}`]);
    const updatesPrivatePlaylist = await request(app)
      .patch(`/api/playlists/${createdPrivatePlaylist.body.playlist.id}`)
      .send({ isPublic: false })
      .set("Cookie", [`accessToken=${accessTokens[1]}`]);
    privatePlaylistId = updatesPrivatePlaylist.body.playlist.id;
  });

  describe("POST /playlists - create playlist", () => {
    it("should create a new playlist", async () => {
      const res = await request(app)
        .post(`/api/playlists/`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.playlist).toMatchObject({
        name: "Your Playlist",
        songs: [],
      });

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
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.playlist).toBeTruthy();
    });

    it("should fail if playlist does not exist", async () => {
      // Random mongodb id
      const res = await request(app)
        .get(`/api/playlists/679768a4c6c76c491a61e4ab`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });

    it("should fail if the playlist is private and not owner by the user", async () => {
      const res = await request(app)
        .get(`/api/playlists/${privatePlaylistId}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });
  });

  describe("PATCH /playlists/:id - update playlist", () => {
    let oldImgId;

    it("should update the playlist name, img and description", async () => {
      const imgFile = fs.readFileSync(resolve(__dirname, "./src/testImg.png"));

      const res = await request(app)
        .patch(`/api/playlists/${playlistId}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`])
        .field("name", `Sunny's favourites`)
        .field("description", `A description of a playlist`)
        .attach("img", imgFile, "testImg.png");

      oldImgId = res.body.playlist.img;

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.playlist).toMatchObject({
        name: `Sunny's favourites`,
        description: "A description of a playlist",
      });
    });

    it("should update the playlist img and delete the old file", async () => {
      const imgFile = fs.readFileSync(resolve(__dirname, "./src/testImg.png"));

      const res = await request(app)
        .patch(`/api/playlists/${playlistId}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`])
        .attach("img", imgFile, "testImg.png");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");

      const deletedFileDoc = await File.findById(oldImgId);
      expect(deletedFileDoc).toBeFalsy();
    });

    it("should fail if playlist does not exist", async () => {
      // Random mongodb id
      const res = await request(app)
        .patch(`/api/playlists/6798830bb68506c3e2b7fc6f`) // random id
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });

    it("should fail if the playlist is private and not owner by the user", async () => {
      const res = await request(app)
        .patch(`/api/playlists/${privatePlaylistId}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });

    // TODO: check for updates on likedSongs
    it("should fail if the playlist is liked songs", async () => {
      const res = await request(app)
        .patch(`/api/playlists/${loggedInUsers[0].likedSongs}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(403);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(
        /You don't have permission to perform this action/i,
      );
    });
  });

  describe("DELETE /playlists/:id - delete playlist", () => {
    it("should delete the playlist successfully", async () => {
      // Delete playlist
      const res = await request(app)
        .delete(`/api/playlists/${playlistId}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(200);
      const deletedPlaylist = await Playlist.findById(playlistId);
      expect(deletedPlaylist).toBeNull();

      const updatedUser = await User.findById(userIds[0]);
      expect(updatedUser.playlists).not.toContain(playlistId);
    });

    it("should fail if playlist does not exist", async () => {
      // Random mongodb id
      const res = await request(app)
        .delete(`/api/playlists/679768a4c6c76c491a61e4ab`) // Random id
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });

    it("should fail if the playlist is private and not owned by the user", async () => {
      const res = await request(app)
        .delete(`/api/playlists/${privatePlaylistId}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });

    it("should fail if the playlist is liked songs", async () => {
      const res = await request(app)
        .delete(`/api/playlists/${loggedInUsers[0].likedSongs}`)
        .set("Cookie", [`accessToken=${accessTokens[0]}`]);

      expect(res.status).toBe(403);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(
        /You don't have permission to perform this action/i,
      );
    });
  });
});

describe("Library routes", () => {
  let loggedInUser;

  beforeAll(async () => {
    // Login user
    const res = await createUsersAndLogin([
      {
        name: "Sunny",
        email: "sunny@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      },
      {
        name: "Kai",
        email: "kai@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      },
    ]);

    loggedInUsers = res.loggedInUsers;
    console.log(loggedInUsers);

    // Create playlist
    // const playlist = await request(app)
    //   .post(`/api/playlists/`)
    //   .set("Cookie", [`accessToken=${accessTokens[0]}`]);
    // playlistId = playlist.body.playlist.id;

    // // Create private playlist
    // const createdPrivatePlaylist = await request(app)
    //   .post(`/api/playlists/`)
    //   .set("Cookie", [`accessToken=${accessTokens[1]}`]);
    // const updatesPrivatePlaylist = await request(app)
    //   .patch(`/api/playlists/${createdPrivatePlaylist.body.playlist.id}`)
    //   .send({ isPublic: false })
    //   .set("Cookie", [`accessToken=${accessTokens[1]}`]);
    // privatePlaylistId = updatesPrivatePlaylist.body.playlist.id;
  });

  describe("PATCH /playlists/save/:id", () => {
    it("should fail if playlist does not exist", async () => {
      const res = await request(app)
        .get(`/api/playlists/6799f04c6cf1dc3302712949`) // Random mongodb id
        .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Playlist not found/i);
    });

    // Test playlist does not exist
    // Test playlist private and does not belong to user
    // Test likedSongs should fail
    // Test saving personal playlist should fail

    // Test playlist should be added to liked ones and update library
  });
});
