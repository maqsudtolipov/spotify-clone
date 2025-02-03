const authorize = require("../../src/middlewares/authorize");
const middlewareMock = require("../helpers/middlewareMock");
const User = require("../../src/models/userModel");
const app = require("../../src/app");
const httpMocks = require("node-mocks-http");

jest.mock("../../src/models/userModel");

let server;
beforeAll(async () => {
  server = app.listen(3009);
});

afterAll(async () => {
  server.close();
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Authorize middleware", () => {
  it("should call the next function", async () => {
    User.findById.mockResolvedValue({id: "userId", role: "admin"});

    const {req, res, next} = middlewareMock({user: {id: "userId"}});
    const authorizeRes = authorize(["admin"]);
    await authorizeRes(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
