const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should be able to register new user", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      firstName: "test",
      lastName: "test",
      phoneNumber: "test",
      email: "test",
      password: "test",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  }).timeout(10000);

  it("should be able to login a user", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test",
      password: "test",
    });

    expect(response.statusCode).toBe(200);
    expect(response.status).toBe("success");
  }).timeout(10000);
});
