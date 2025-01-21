const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");

const createUsersAndLogin = async (users, userIndexForToken = 0) => {
  const userIds = [];
  let accessToken;

  for (const [index, user] of users.entries()) {
    // Signup user
    const { role, ...userData } = user;
    const signupRes = await request(app)
      .post("/api/auth/signup")
      .send(userData);
    userIds.push(signupRes.body.data.id);

    // If the role is specified, update it
    if (role) {
      await User.findByIdAndUpdate(signupRes.body.data.id, {
        role,
      });
    }

    // Login the user and store their token based on given index
    if (userIndexForToken === index) {
      const loginRes = await request(app).post("/api/auth/login").send({
        email: userData.email,
        password: userData.password,
      });

      accessToken =
        loginRes
          .get("set-cookie")
          .find((cookie) => cookie.startsWith("accessToken="))
          .match(/accessToken=([^;]+)/)[1] || null;
    }
  }

  return {
    userIds,
    accessToken,
  };
};

module.exports = createUsersAndLogin;
