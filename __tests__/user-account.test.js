const request = require("supertest");
// const app = require("../../lendsqrs/app");

describe("Account API", () => {
  it("should create a user wallet", async () => {
    const response = await request(app).post("/api/v1/user/wallet").send({
     accountholder: "test",
    accountNumber: "test",
      balance: "test",
      userId: "test",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User Bank Wallet successfully");
  }).timeout(10000);

  it("authenticated user should be able to get all their wallet", async () => {
    const response = await request(app)
      .get("/api/v1/user/wallet")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "User wallet retrieved successfully"
    );
  });

  it("authenticated user should be able to fund their wallet", async () => {
    const response = await request(app)
      .post("/api/v1/user/wallet/1/fund")
      .set("Authorization", "Bearer " + token)
      .send({
        amount: 100,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User wallet funded successfully");
  }).timeout(10000);

  it("authenticated user should be able to transfer funds to another user", async () => {
    const response = await request(app)
      .post("/api/v1/users/account/1/transfer")
      .set("Authorization", "Bearer " + token)
      .send({
        amount: 100,
        to: 2,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "User wallet transferred successfully"
    );
  }).timeout(10000);
});
