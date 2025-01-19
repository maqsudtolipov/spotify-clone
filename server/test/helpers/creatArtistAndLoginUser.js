const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");

const creatArtistAndLoginUser = async () => {
  const users = [
    {
      name: "Soham Welch",
      email: "sohamwelch@example.com",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$1234",
    },
    {
      name: "Sylvia Gonzalez",
      email: "sylviagonzalez@example.com",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$1234",
    },
  ];

  const user1 = await request(app).post("/api/auth/signup").send(users[0]);
  const user2 = await request(app).post("/api/auth/signup").send(users[1]);

  // Login the first user
  const loginRes = await request(app).post("/api/auth/login").send(users[0]);

  // Make the second user an artist
  await User.findByIdAndUpdate(user2.body.data.id, {
    role: "artist",
  });

  const accessToken =
    loginRes
      .get("set-cookie")
      .find((cookie) => cookie.startsWith("accessToken="))
      .match(/accessToken=([^;]+)/)[1] || null;

  return { accessToken, userIds: [user1.body.data.id, user2.body.data.id] };
};

module.exports = creatArtistAndLoginUser;
