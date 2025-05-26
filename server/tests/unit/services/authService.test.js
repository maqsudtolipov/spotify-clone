const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");
const User = require("../../../src/models/userModel");
const loginService = require("../../../src/services/authService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../../../src/models/refreshTokenModel");
const InvalidAccessToken = require("../../../src/models/invalidAccessTokenModel");

jest.mock("jsonwebtoken");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("signupUser", () => {
  it("should throw 422 error if any of inputs are missing", async () => {
    const resError = await authService
      .signupUser({ email: "user@example.com" })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 422,
      message: "Please provide name, email, password and passwordConfirm",
    });
  });

  it("should throw 409 error if user already exists", async () => {
    jest
      .spyOn(User, "findOne")
      .mockResolvedValue({ email: "user@example.com" });
    const resError = await authService
      .signupUser({
        name: "User",
        email: "user@example.com",
        password: "pass1234",
        passwordConfirm: "pass1234",
      })
      .catch((e) => e);

    expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 409,
      message: "User already exists",
    });
  });

  it("should create new user and return their data", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "getDefaultUserImgId").mockResolvedValue("defaultImgId");
    jest.spyOn(User, "create").mockResolvedValue({
      email: "user@example.com",
    });

    const newUser = await authService.signupUser({
      name: "User",
      email: "user@example.com",
      password: "pass1234",
      passwordConfirm: "pass1234",
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
    expect(User.getDefaultUserImgId).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith({
      name: "User",
      email: "user@example.com",
      password: "pass1234",
      passwordConfirm: "pass1234",
      img: "defaultImgId",
      role: "user",
    });

    expect(newUser).toMatchObject({
      email: "user@example.com",
    });
  });
});

describe("loginUser", () => {
  it("should throw 422 error for missing inputs", async () => {
    const resError = await authService
      .loginUser({ email: "user@example.com" })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 422,
      message: "Please provide email and password",
    });
  });

  it("should throw 401 is user does not exist", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: () => null,
    });

    const resError = await loginService
      .loginUser({ email: "user@example.com", password: "pass1234" })
      .catch((e) => e);

    expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 401,
      message: "Invalid email or password",
    });
  });

  it("should throw 401 if passwords do not match", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        email: "user@example.com",
        password: "correctPass",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const resError = await loginService
      .loginUser({ email: "user@example.com", password: "wrongPass" })
      .catch((e) => e);

    expect(User.findOne).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("wrongPass", "correctPass");
    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 401,
      message: "Invalid email or password",
    });
  });

  it("should return user data", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        id: "userId",
        name: "User",
        img: "user.png",
        password: "password",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const res = await loginService.loginUser(
      {
        email: "user@example.com",
        password: "password",
      },
      "res",
    );

    expect(User.findOne).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "password");

    expect(res).toMatchObject({
      id: "userId",
      name: "User",
      img: "user.png",
    });
  });
});

describe("refreshTokens", () => {
  it("should throw 401 if token is not provided", async () => {
    const error = await authService.refreshTokens().catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 401,
      status: "fail",
      message: "No refresh token provided",
    });
  });

  it("should throw 401 if token is invalid", async () => {
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error();
    });

    const error = await authService
      .refreshTokens("invalidToken")
      .catch((e) => e);

    expect(jwt.verify).toHaveBeenCalled();
    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 401,
      status: "fail",
      message: "Refresh token is invalid or expired",
    });
  });

  it("should throw 401 if refresh token is not stored in db", async () => {
    jest.spyOn(jwt, "verify").mockReturnValue({
      token: "refreshToken",
      userId: "userId",
    });
    jest.spyOn(RefreshToken, "findOne").mockResolvedValue(null);

    const error = await authService
      .refreshTokens("refreshToken")
      .catch((e) => e);

    expect(jwt.verify).toHaveBeenCalled();
    expect(RefreshToken.findOne).toHaveBeenCalledWith({
      token: "refreshToken",
      userId: "userId",
    });

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 401,
      status: "fail",
      message: "Refresh token is invalid or expired",
    });
  });

  it("should delete old tokens form DB and return user id", async () => {
    jest.spyOn(jwt, "verify").mockReturnValue({
      token: "refreshToken",
      userId: "userId",
    });
    jest.spyOn(RefreshToken, "findOne").mockResolvedValue({
      userId: "userId",
    });
    jest.spyOn(RefreshToken, "deleteMany").mockResolvedValue();

    const res = await authService.refreshTokens("refreshToken");

    console.log(res);

    expect(jwt.verify).toHaveBeenCalled();
    expect(RefreshToken.findOne).toHaveBeenCalledWith({
      token: "refreshToken",
      userId: "userId",
    });
    expect(RefreshToken.deleteMany).toHaveBeenCalledWith({ userId: "userId" });
  });
});

describe("logoutUser", () => {
  it("should refresh tokens and block old access token", async () => {
    jest.spyOn(RefreshToken, "deleteMany").mockResolvedValue();
    jest.spyOn(InvalidAccessToken, "create").mockResolvedValue();

    await authService.logoutUser("userId", { token: "token", exp: Date.now() });

    expect(RefreshToken.deleteMany).toHaveBeenCalledWith({ userId: "userId" });
    expect(InvalidAccessToken.create).toHaveBeenCalledWith({
      token: "token",
      userId: "userId",
      expiresAt: expect.any(Date),
    });
  });
});
