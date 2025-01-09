const request = require("supertest");
const app = require("../../src/app");

const createTwoUsersAndReturnIds = async () => {
  const users = [
    {
      name: "Marlene Carr",
      email: "marlenecarr@example.com",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$1234",
    },
    {
      name: "Alice Duncan",
      email: "aliceduncan@example.com",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$1234",
    },
  ];

  const user1 = await request(app).post("/api/auth/signup").send(users[0]);
  const user2 = await request(app).post("/api/auth/signup").send(users[1]);

  // Login the first user
  const loginRes = await request(app).post("/api/auth/login").send(users[0]);

  const accessToken =
    loginRes
      .get("set-cookie")
      .find((cookie) => cookie.startsWith("accessToken="))
      .match(/accessToken=([^;]+)/)[1] || null;

  return { accessToken, userIds: [user1.body.data.id, user2.body.data.id] };
};

module.exports = createTwoUsersAndReturnIds;
