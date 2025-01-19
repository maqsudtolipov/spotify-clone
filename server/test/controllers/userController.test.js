const mongoose = require("mongoose");
const app = require("../../src/app");
const request = require("supertest");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const fs = require("node:fs");
const { resolve } = require("node:path");
const connectToDatabase = require("../helpers/connectToDatabase");
const signupAndLoginUser = require("../helpers/signupAndLoginUser");
const createTwoUsersAndReturnIds = require("../helpers/createTwoUsersAndLoginFirst");

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
  describe("/:id route", () => {
    let accessToken, userIds;

    beforeAll(async () => {
      ({ accessToken, userIds } = await createTwoUsersAndReturnIds());
    });

    afterAll(async () => {
      await User.deleteMany();
      await RefreshToken.deleteMany();
    });

    it("should return user data", async () => {
      const res = await request(app)
        .get(`/api/users/${userIds[1]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      // Check response
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user.id).toEqual(userIds[1]);
    });

    it("should fail if the user does not exist", async () => {
      // random user id
      const res = await request(app)
        .get(`/api/users/67820f16484d41c8720c8375`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      // Check response
      expect(res.status).toBe(404);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User not found/i);
    });

    it("should fail if user id is invalid", async () => {
      const res = await request(app)
        .post(`/api/users/follow/wrongWord`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid user id: wrongWord/i);
    });
  });

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

    afterAll(async () => {
      await User.deleteMany();
      await RefreshToken.deleteMany();
    });

    it("should update users followings list and candidates followers list", async () => {
      // send follow request
      const res = await request(app)
        .post(`/api/users/follow/${userIds[1]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      console.log(res.body)

      // Check response
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data.followings[0]).toEqual(userIds[1]);

      // Check database updates
      const currentUser = await User.findById(userIds[0]);
      const candidateUser = await User.findById(userIds[1]);

      expect(currentUser.followings[0].toString()).toEqual(userIds[1]);
      expect(candidateUser.followers[0].toString()).toEqual(userIds[0]);
    });

    it("should fail if required id is invalid", async () => {
      const res = await request(app)
        .post(`/api/users/follow/wrongWord`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid user id: wrongWord/i);
    });

    it("should fail if candidate does not exist", async () => {
      // The id is randomly generated
      const res = await request(app)
        .post(`/api/users/follow/677fa3364800ced107643ea1`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User not found/i);
    });

    it("should fail if user tries to follow himself", async () => {
      const res = await request(app)
        .post(`/api/users/follow/${userIds[0]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User cannot follow himself/i);
    });
  });

  describe("/unfollow route", () => {
    let accessToken, userIds;

    beforeAll(async () => {
      ({ accessToken, userIds } = await createTwoUsersAndReturnIds());
    });

    afterAll(async () => {
      await User.deleteMany();
      await RefreshToken.deleteMany();
    });

    it("should update users followings list and candidates followers list", async () => {
      // send follow request
      await request(app)
        .post(`/api/users/follow/${userIds[1]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      // send unfollow request
      const res = await request(app)
        .post(`/api/users/unfollow/${userIds[1]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      // Check response
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data.followings.length).toEqual(0);

      // Check database updates
      const currentUser = await User.findById(userIds[0]);
      const candidateUser = await User.findById(userIds[1]);

      expect(currentUser.followings.length).toEqual(0);
      expect(candidateUser.followers.length).toEqual(0);
    });

    it("should fail if required id is invalid", async () => {
      const res = await request(app)
        .post(`/api/users/unfollow/wrongWord`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid user id: wrongWord/i);
    });

    it("should fail if candidate does not exist", async () => {
      // The id is randomly generated
      const res = await request(app)
        .post(`/api/users/unfollow/677fa3364800ced107643ea1`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User not found/i);
    });

    it("should fail if user tries to unfollow himself", async () => {
      const res = await request(app)
        .post(`/api/users/unfollow/${userIds[0]}`)
        .set("Cookie", [`accessToken=${accessToken}`]);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User cannot unfollow himself/i);
    });
  });
});
