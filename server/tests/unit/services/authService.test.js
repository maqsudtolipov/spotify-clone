const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");
const User = require("../../../src/models/userModel");
const loginService = require("../../../src/services/authService");
const bcrypt = require("bcryptjs");
const RefreshToken = require("../../../src/models/refreshTokenModel");

jest.mock("../../../src/utils/attachCookieTokens", () => ({
  attachAccessCookie: jest.fn(),
  attachRefreshCookie: jest.fn(),
}));

const {
  attachAccessCookie,
  attachRefreshCookie,
} = require("../../../src/utils/attachCookieTokens");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("signUp", () => {
  it("should throw 422 error if any of inputs are missing", async () => {
    const resError = await authService
      .signUp({ email: "user@example.com" })
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
      .signUp({
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

    const newUser = await authService.signUp({
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

describe("login", () => {
  it("should throw 422 error for missing inputs", async () => {
    const resError = await authService
      .login({ email: "user@example.com" })
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
      .login({ email: "user@example.com", password: "pass1234" })
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
      .login({ email: "user@example.com", password: "wrongPass" })
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

  it("should generate cookies correctly and return user data", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        id: "userId",
        name: "User",
        img: "user.png",
        password: "password",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    jest.spyOn(RefreshToken, "create").mockResolvedValue(null);

    attachRefreshCookie.mockReturnValue({
      refreshToken: "token",
      expiresAt: "dd/MM/yyyy",
    });

    const res = await loginService.login({
      email: "user@example.com",
      password: "password",
    }, 'res');

    expect(User.findOne).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "password");

    expect(attachAccessCookie).toHaveBeenCalledWith("userId", "res");
    expect(attachRefreshCookie).toHaveBeenCalledWith("userId", "res");
    expect(attachRefreshCookie).toHaveReturnedWith({
      refreshToken: "token",
      expiresAt: "dd/MM/yyyy",
    });

    expect(RefreshToken.create).toHaveBeenCalledWith({
      token: "token",
      userId: "userId",
      expiresAt: "dd/MM/yyyy",
    });

    expect(res).toMatchObject({
      id: "userId",
      name: "User",
      img: "user.png",
    });
  });
});
