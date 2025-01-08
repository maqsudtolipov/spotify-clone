const mongoose = require("mongoose");
const app = require("../../src/app");
const request = require("supertest");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const fs = require("node:fs");
const { resolve } = require("node:path");
const connectToDatabase = require("../helpers/connectToDatabase");
const signupAndLoginUser = require("../helpers/signupAndLoginUser");

let server, accessToken, img;

beforeAll(async () => {
  process.env.NODE_ENV = "production";
  await connectToDatabase();
  server = app.listen(3009);
  ({ accessToken, img } = await signupAndLoginUser());
});

afterAll(async () => {
  await User.deleteMany();
  await RefreshToken.deleteMany();
  await mongoose.disconnect();
  server.close();
});

describe("userController", () => {
  describe("/updateMe route", () => {
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
});
