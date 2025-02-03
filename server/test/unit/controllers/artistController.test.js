const app = require("../../../src/app");
const User = require("../../../src/models/userModel");
const RefreshToken = require("../../../src/models/refreshTokenModel");
const request = require("supertest");
const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../../helpers/databaseHelpers");
const createUsersAndLogin = require("../../helpers/createUsersAndLogin");

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

describe("artistController", () => {
  describe("/:id route", () => {
    let accessToken, userIds;

    beforeAll(async () => {
      const res = await createUsersAndLogin(
        [
          {
            name: "Herbert Mitchelle",
            email: "hertbertmitchelle@example.com",
            password: "Pa$$1234",
            passwordConfirm: "Pa$$1234",
          },
          {
            name: "Roland Mcdonalid",
            email: "roland.mcdonalid@example.com",
            password: "Pa$$1234",
            passwordConfirm: "Pa$$1234",
            role: "artist",
          },
        ],
        0,
      );

      userIds = res.userIds;
      accessToken = res.accessToken;
    });

    afterAll(async () => {
      await User.deleteMany();
      await RefreshToken.deleteMany();
    });

    it("should return artist data", async () => {
      const res = await request(app)
        .get(`/api/artists/${userIds[1]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.artist.id).toEqual(userIds[1]);
      expect(res.body.artist.role).toEqual("artist");
    });

    it("should fail if the artist does not exist", async () => {
      // random user id
      const res = await request(app)
        .get("/api/artists/678cbb77690dd2f07b318bb5")
        .set("Cookie", [`accessToken=${accessToken}`]);

      // Check response
      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Artist not found/i);
    });

    it("should fail if artist id is invalid", async () => {
      const res = await request(app)
        .get("/api/artists/wrongWord")
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid artist id: wrongWord/i);
    });
  });
});
