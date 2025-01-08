const mongoose = require("mongoose");
const app = require("../../src/app");
const request = require("supertest");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const fs = require("node:fs");
const { resolve } = require("node:path");

let server, accessToken, img;

beforeAll(async () => {
  process.env.NODE_ENV = "production";

  if (
    !process.env.DB_TEST_URL &&
    !/test-database/.test(process.env.DB_TEST_URL)
  ) {
    console.log("Tests can only and must connect to a test database.");
  }

  const DB = process.env.DB_TEST_URL.replace(
    "<db_password>",
    process.env.DB_PASS,
  );
  await mongoose.connect(DB);

  server = app.listen(3009);

  // Signup and login user
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    password: "Pa$$1234",
    passwordConfirm: "Pa$$1234",
  };

  await request(app).post("/api/auth/signup").send(userData);
  const loginRes = await request(app).post("/api/auth/login").send(userData);

  accessToken =
    loginRes
      .get("set-cookie")
      .find((cookie) => cookie.startsWith("accessToken="))
      .match(/accessToken=([^;]+)/)[1] || null;
  img = loginRes.body.user.img;
});

afterAll(async () => {
  await User.deleteMany();
  await RefreshToken.deleteMany();
  await mongoose.disconnect();
  server.close();
});

// updateMe
// - should update intended fields when provided
// - should ignore update when unknown fields are provided

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
