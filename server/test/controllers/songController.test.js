const connectToDatabase = require("../helpers/connectToDatabase");
const app = require("../../src/app");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const mongoose = require("mongoose");
const Song = require("../../src/models/songModel");
const fs = require("node:fs");
const { resolve } = require("node:path");
const request = require("supertest");
const createUsersAndLogin = require("../helpers/createUsersAndLogin");

let server;
beforeAll(async () => {
  process.env.NODE_ENV = "production";
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await User.deleteMany();
  await Song.deleteMany();
  await RefreshToken.deleteMany();
  await mongoose.disconnect();
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
});
