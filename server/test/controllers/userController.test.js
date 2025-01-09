const mongoose = require("mongoose");
const app = require("../../src/app");
const request = require("supertest");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const fs = require("node:fs");
const { resolve } = require("node:path");
const connectToDatabase = require("../helpers/connectToDatabase");
const signupAndLoginUser = require("../helpers/signupAndLoginUser");
const createTwoUsersAndReturnIds = require("../helpers/createTwoUsersAndReturnIds");

let server;

beforeAll(async () => {
  process.env.NODE_ENV = "production";
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await User.deleteMany();
  await RefreshToken.deleteMany();
  await mongoose.disconnect();
  server.close();
});

describe("userController", () => {
  describe("/updateMe route", () => {
    let accessToken, img;

    beforeAll(async () => {
      ({ accessToken, img } = await signupAndLoginUser());
    });

    it("should update user name", async () => {
      const res = await request(app)
        .patch("/api/users/updateMe")
        .set("Cookie", [`accessToken=${accessToken}`])
        .send({ name: "Jane Doe" });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user).toHaveProperty("name", "Jane Doe");
    });

    it("should update user img", async () => {
      // load file in img called 'cat.jpg' in current folder using fs
      const userImg = fs.readFileSync(resolve(__dirname, "cat.jpg"));

      const res = await request(app)
        .patch("/api/users/updateMe")
        .set("Cookie", [`accessToken=${accessToken}`])
        .attach("userImg", userImg, resolve(__dirname, "cat.jpg"));

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user.img).not.toEqual(img);
    });

    it("should not update user if nothing is provided", async () => {
      const res = await request(app)
        .patch("/api/users/updateMe")
        .set("Cookie", [`accessToken=${accessToken}`])
        .send({});

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user).toHaveProperty("name", "Jane Doe"); // based on previous test
    });
  });

  describe("/follow route", () => {
    let accessToken, userIds;

    beforeAll(async () => {
      ({ accessToken, userIds } = await createTwoUsersAndReturnIds());
    });

    it("should update users followings list and candidates followers list", async () => {
      // send follow request
      const res = await request(app)
        .post(`/api/users/follow/${userIds[1]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      // Check response
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.followings[0]).toEqual(userIds[1]);

      // Check database updates
      const currentUser = await User.findById(userIds[0]);
      const candidateUser = await User.findById(userIds[1]);

      expect(currentUser.followings[0].toString()).toEqual(userIds[1]);
      expect(candidateUser.followers[0].toString()).toEqual(userIds[0]);
    });

    it("should fail if required fields are missing", async () => {
      const res = await request(app)
        .post(`/api/users/follow/`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Please provide user id/i);
    });

    it("should fail if candidate id is wrong", async () => {
      // The id is randomly generated
      const res = await request(app)
        .post(`/api/users/follow/677fa3364800ced107643ea1`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User not found/i);
    });
  });
});
