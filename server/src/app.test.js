const request = require("supertest");
const app = require("./app");

describe("GET /greet", () => {
  it("should greet the world when no name is provided", async () => {
    const res = await request(app)
      .get("/greet")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toBe("Hello, World!");
  });

  it("should greet the user when a name is provided", async () => {
    const res = await request(app)
      .get("/greet?name=John")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toBe("Hello, John!");
  });
});