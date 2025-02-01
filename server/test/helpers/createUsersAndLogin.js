const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");
const { testUsers } = require("../testData");

const createUsersAndLogin = async (numOfUsers) => {
  const users = testUsers.slice(0, numOfUsers);
  const loggedInUsers = [];

  for (const user of users) {
    // Signup user
    const { role, ...userData } = user;
    const signupRes = await request(app)
      .post("/api/auth/signup")
      .send(userData);

    // If the role is specified, update it
    if (role) {
      await User.findByIdAndUpdate(signupRes.body.data.id, {
        role,
      });
    }

    // Login the user
    const loginRes = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    const accessToken =
      loginRes
        .get("set-cookie")
        .find((cookie) => cookie.startsWith("accessToken="))
        .match(/accessToken=([^;]+)/)[1] || null;
    loggedInUsers.push({ ...loginRes.body.user, accessToken });

    loggedInUsers.push({ ...loginRes.body.user, accessToken });
  }

  return loggedInUsers;
};

module.exports = createUsersAndLogin;
