const app = require("../../src/app");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const mongoose = require("mongoose");
const Song = require("../../src/models/songModel");
const fs = require("node:fs");
const { resolve } = require("node:path");
const request = require("supertest");
const createUsersAndLogin = require("../helpers/createUsersAndLogin");
const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../helpers/databaseHelpers");

let server;
beforeAll(async () => {
  process.env.NODE_ENV = "production";
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await cleanupDatabaseAndDisconnect();
  server.close();
});

describe("songController", () => {
  describe("uploadSong", () => {
    let userIds, accessToken;

    beforeAll(async () => {
      const res = await createUsersAndLogin(
        [
          {
            name: "Herbert Mitchelle",
            email: "hertbertmitchelle@example.com",
            password: "Pa$$1234",
            passwordConfirm: "Pa$$1234",
            role: "artist",
          },
          {
            name: "Roland Mcdonalid",
            email: "roland.mcdonalid@example.com",
            password: "Pa$$1234",
            passwordConfirm: "Pa$$1234",
          },
        ],
        0,
      );

      userIds = res.userIds;
      accessToken = res.accessToken;
    });

    it("should fail if the required fields are missing", async () => {
      const songFile = fs.readFileSync(
        resolve(__dirname, "./src/WildStrawberry.mp3"),
      );

      const res = await request(app)
        .post(`/api/artists/${userIds[0]}/songs`)
        .set("Cookie", [`accessToken=${accessToken}`])
        .field("name", "Wild Strawberry")
        .attach("song", songFile, "WildStrawberry.mp3");

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(
        /All fields are required: song, img and name/i,
      );
    });
  });

  describe("likeSong", () => {
    let userIds, accessToken, songId;

    beforeAll(async () => {
      // Create users
      const res = await createUsersAndLogin(
        [
          {
            name: "Sunny",
            email: "sunny@example.com",
            password: "Pa$$1234",
            passwordConfirm: "Pa$$1234",
            role: "artist",
          },
          {
            name: "Kai",
            email: "kai@example.com",
            password: "Pa$$1234",
            passwordConfirm: "Pa$$1234",
          },
        ],
        1,
      );

      userIds = res.userIds;
      accessToken = res.accessToken;

      const songInput = {
        name: "Pale Garden",
        song: "pale-garden.mp3",
        img: "pale-garden.png",
        artist: userIds[0],
        duration: 120,
      };

      const song = await Song.create(songInput);
      songId = song.id;
    });

    it("should fail if song id is invalid", async () => {
      const res = await request(app)
        .post(`/api/songs/wrongId/like`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid _id: wrongId/i);
    });
  });
});
