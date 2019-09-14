const server = require("../api/server.js");
const request = require("supertest");

it("should return status 200", () => {
  return request(server)
    .get("/")
    .then(res => {
      expect(res.status).toBe(200);
    });
});
