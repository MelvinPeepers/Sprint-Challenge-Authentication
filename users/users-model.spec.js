const Users = require("./users-model.js");

const db = require("../database/dbConfig.js");

// setup suite
describe("The Users Model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("the insert function", () => {
    it("should insert a new user", async () => {
      // test setup
      const userData = { username: "Serenity" };
      await Users.insert(userData);

      // assertion
      const users = await db("users");
      expect(users.length).toBe(1);
      expect(users[0].username).toBe("Serenity");
    });

    it("should resolve to the newly created user", async () => {
      const userData = { username: "Serenity" };
      const user = await Userss.insert(userData);

      expect(user).toEqual({ id: 7, username: "Serenity" });
    });
  });
});
