const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

let userId = "";
let loginToken = "";
let postID = "";
describe("api/users", () => {
  describe("register and login user given a valid username and password", () => {
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

    test("login with given valid registed user with correct username and password", async () => {
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

describe("/api/posts", () => {
  describe("create, get, patch and delete a post given an valid login token and valid title and description", () => {
    test("create a post given a valid login credenital with JWT auth token", async () => {
      const response = await request
        .post("/api/posts")
        .set("auth-token", `${loginToken}`)
        .send({
          title: "Alexander's first post",
          description: "What's up guys",
        });
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBeDefined();
      postID = response.body._id;
    });

    test("should respond with a 200 status and match postID for GET request for specific post", async () => {
      const response = await request.get(`/api/posts/${postID}`);
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(postID);
    });

    test("update post title and description given the postID to update and new title and desciption values", async () => {
      const response = await request.patch(`/api/posts/${postID}`).send({
        title: "Alexander's first post updated",
        description: "What's up guys updated",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(postID);
      expect(response.body.title).toBe("Alexander's first post updated");
      expect(response.body.description).toBe("What's up guys updated");
    });

    test("delete a post given the postID", async () => {
      const response = await request.delete(`/api/posts/${postID}`);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("cleanup test User", () => {
  test("delete user post given the userID", async () => {
    const response = await request.delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
  });
});
