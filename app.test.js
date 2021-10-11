const supertest = require("supertest");
const app = require("./app");
const request = supertest(app);

let userId = "";
let loginToken = "";

describe("POST /users", () => {
  describe("register user given a valid non registered username and password", () => {
    test("should respond with a 200 status code when registering new user", async () => {
      const response = await request.post("/api/users/register").send({
        name: "Alexander",
        email: "alexander@gmail.com",
        password: "badpassword",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.userId).toBeDefined();
      userId = response.body.userId;
    });

    describe("login with given valid registed user with correct username and password", () => {
      test("should respond with a 200 status code when logging in", async () => {
        const response = await request.post("/api/users/login").send({
          email: "alexander@gmail.com",
          password: "badpassword",
        });
        //console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.body.authToken).toBeDefined();
        loginToken = response.body.authToken;
      });
    });
  });
});

describe("POST /posts", () => {
  describe("create a post given an valid login token and valid title and description", () => {
    test("should respond with a 200 status code when registering new user", async () => {
      console.log(loginToken);
      const response = await request
        .post("/posts")
        .set("auth-token", `${loginToken}`)
        .send({
          title: "Alexander's first post",
          description: "What's up guys",
        });
      console.log(response.headers);
      expect(response.statusCode).toBe(200);
    });
  });
});
