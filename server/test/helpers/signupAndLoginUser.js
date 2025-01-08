const request = require("supertest");
const app = require("../../src/app");

const signupAndLoginUser = async () => {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    password: "Pa$$1234",
    passwordConfirm: "Pa$$1234",
  };

  await request(app).post("/api/auth/signup").send(userData);
  const loginRes = await request(app).post("/api/auth/login").send(userData);

  const accessToken =
    loginRes
      .get("set-cookie")
      .find((cookie) => cookie.startsWith("accessToken="))
      .match(/accessToken=([^;]+)/)[1] || null;
  const img = loginRes.body.user.img;

  return { accessToken, img };
};

module.exports = signupAndLoginUser;
