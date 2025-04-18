const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../helpers/databaseHelpers");
const app = require("../../src/config/app.config");
const createUsersAndLogin = require("../helpers/createUsersAndLogin");
const request = require("supertest");
const Playlist = require("../../src/models/playlistModel");
const User = require("../../src/models/userModel");
const File = require("../../src/models/fileModel");
const fs = require("node:fs");
const {resolve} = require("node:path");
const Library = require("../../src/models/libraryModel");

let server;
beforeAll(async () => {
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await cleanupDatabaseAndDisconnect();
  server.close();
});

describe("PlaylistController", () => {
  describe("Playlist routes", () => {
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
        .send({isPublic: false})
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
        const imgFile = fs.readFileSync(
          resolve(__dirname, "./src/testImg.png"),
        );

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
        const imgFile = fs.readFileSync(
          resolve(__dirname, "./src/testImg.png"),
        );

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

  describe("Library update routes", () => {
    let loggedInUsers,
      privatePlaylistId,
      personalPlaylistId,
      differentPlaylistId;

    beforeAll(async () => {
      // Login user
      const res = await createUsersAndLogin([
        {
          name: "Makena",
          email: "makena@example.com",
          password: "Pa$$1234",
          passwordConfirm: "Pa$$1234",
        },
        {
          name: "Zuri",
          email: "zuri@example.com",
          password: "Pa$$1234",
          passwordConfirm: "Pa$$1234",
        },
      ]);

      loggedInUsers = res.loggedInUsers;

      // Create personal playlist
      const createPersonalPlaylistRes = await request(app)
        .post(`/api/playlists/`)
        .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);
      personalPlaylistId = createPersonalPlaylistRes.body.playlist.id;

      // Create different playlist
      const createDifferentPlaylistRes = await request(app)
        .post(`/api/playlists/`)
        .set("Cookie", [`accessToken=${loggedInUsers[1].accessToken}`]);
      differentPlaylistId = createDifferentPlaylistRes.body.playlist.id;

      // Create private playlist
      const createPlaylistRes = await request(app)
        .post(`/api/playlists/`)
        .set("Cookie", [`accessToken=${loggedInUsers[1].accessToken}`]);

      const updatePlaylistRes = await request(app)
        .patch(`/api/playlists/${createPlaylistRes.body.playlist.id}`)
        .send({isPublic: false})
        .set("Cookie", [`accessToken=${loggedInUsers[1].accessToken}`]);
      privatePlaylistId = updatePlaylistRes.body.playlist.id;
    });

    describe("PATCH /playlists/save/:id", () => {
      it("should save playlist to likedSongs and library items lists", async () => {
        const res = await request(app)
          .patch(`/api/playlists/save/${differentPlaylistId}`) // Random mongodb id
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("success");

        console.log(res.body);

        // Check user
        const user = await User.findById(loggedInUsers[0].id);
        expect(user.likedPlaylists.length).toEqual(1);

        // Check library
        const library = await Library.findById(user.library);
        expect(library.items).toHaveLength(2);
        expect(String(library.items[1].refId)).toEqual(differentPlaylistId);
      });

      it("should fail if playlist does not exist", async () => {
        const res = await request(app)
          .patch(`/api/playlists/save/6799f04c6cf1dc3302712949`) // Random mongodb id
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(/Playlist not found/i);
      });

      it("should fail if the playlist is private and not owner by the user", async () => {
        const res = await request(app)
          .patch(`/api/playlists/save/${privatePlaylistId}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(/Playlist not found/i);
      });

      it("should fail if the playlist is liked songs", async () => {
        const res = await request(app)
          .patch(`/api/playlists/save/${loggedInUsers[0].likedSongs}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(403);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(
          /You don't have permission to perform this action/i,
        );
      });

      it("should file if user tries to save personal playlist", async () => {
        const res = await request(app)
          .patch(`/api/playlists/save/${personalPlaylistId}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(403);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(
          /You don't have permission to perform this action/i,
        );
      });
    });

    describe("PATCH /playlists/remove/:id", () => {
      it("should remove playlist from likedPlaylists and library items lists", async () => {
        const res = await request(app)
          .patch(`/api/playlists/remove/${differentPlaylistId}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("success");

        // Check user
        const user = await User.findById(loggedInUsers[0].id);
        expect(user.likedPlaylists).not.toContain(differentPlaylistId);

        // Check library
        const library = await Library.findById(user.library);
        expect(
          library.items.some(
            (item) => String(item.refId) === differentPlaylistId,
          ),
        ).toBe(false);
      });

      it("should fail if playlist does not exist in user’s library", async () => {
        const res = await request(app)
          .patch(`/api/playlists/remove/6799f04c6cf1dc3302712949`) // Random MongoDB ID
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(/Playlist not found/i);
      });

      it("should fail if user tries to remove their own playlist", async () => {
        const res = await request(app)
          .patch(`/api/playlists/remove/${personalPlaylistId}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(403);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(
          /You don't have permission to perform this action/i,
        );
      });

      it("should fail if user tries to remove another user’s private playlist", async () => {
        const res = await request(app)
          .patch(`/api/playlists/remove/${privatePlaylistId}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(/Playlist not found/i);
      });

      it("should fail if user tries to remove liked songs", async () => {
        const res = await request(app)
          .patch(`/api/playlists/remove/${loggedInUsers[0].likedSongs}`)
          .set("Cookie", [`accessToken=${loggedInUsers[0].accessToken}`]);

        expect(res.status).toBe(403);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toMatch(
          /You don't have permission to perform this action/i,
        );
      });
    });
  });
});
