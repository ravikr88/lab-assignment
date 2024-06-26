const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

// first unit test

describe("GET /materials", () => {
  it("should return all materials", async () => {
    const res = await request(app).get("/materials");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// describe("GET /materials/:id", () => {
//   it("should return a product", async () => {
//     const res = await request(app).get("/materials/6331abc9e9ececcc2d449e44");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("Filament");
//   });
// });

// Test for POST /materials
// describe("POST /materials", () => {
//   it("should create a material", async () => {
//     const res = await request(app)
//       .post("/materials")
//       .field("name", "Product 2")
//       .field("technology", "3d printing")
//       .field("colors", ["Red", "Pink", "Yellow"])
//       .field("pricePerGram", 0.09)
//       .field("applicationTypes", ["Mech", "Parts"]);

//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("Product 2");
//   });
// });

// describe("DELETE /materials/:id", () => {
//   it("should delete a product", async () => {
//     const res = await request(app).delete("/materials/<some_id>");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Product deleted successfully");
//   });
// });
