const request = require("supertest");
const app = require("./server");

describe("Test GET /hotels", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/hotels")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("It should respond with 404 not found", async () => {
    const response = await request(app)
      .get("/hotels?stars=400")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toStrictEqual({
      error: "No hotel found",
    });
  });

  test("It should catch wrong query passed", async () => {
    const response = await request(app)
      .get("/hotels?stars=")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Query not correct",
    });
  });
});
