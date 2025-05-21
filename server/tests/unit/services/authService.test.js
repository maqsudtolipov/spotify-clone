const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");
const User = require("../../../src/models/userModel");

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

describe('login', () => {

})