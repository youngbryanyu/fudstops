// unit tests for problems API endpoints
const test_app = require("../testModule");
const request = require("supertest");

// user info constants for tests
const email = "problem@test.com";
const username = "problem";
const password = "problem";
const phone = "0000000003";
const isAdmin = false;
const problem_message = "problem_message";

// send problem message to DB
describe("POST /problem", () => {
    describe("given problem message and valid user", () => {
        test("should return a 201", async () => {
            await createUser();
            await login();

            const response = await request(test_app)
                .post("/api/problem")
                .send({
                    username: username,
                    problem: problem_message
                });
            expect(response.statusCode).toBe(201);
        });
        test("should return a success message", async () => { // TODO
            expect(true).toBe(true);
        });
    });
});

// test get problems submitted from DB for a user
describe("GET /problem/:username", () => {
    describe("given a valid user", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .get("/api/problem/" + username)
                .send();

            expect(response.statusCode).toBe(200);
        });
        test("should return a success message", async () => { // TODO
            expect(true).toBe(true);
        });
    });
    describe("given an invalid username", () => {
        test("should return a 500", async () => {
            const response = await request(test_app)
                .get("/api/problem/INVALID_USER")
                .send();

            expect(response.statusCode).toBe(500);
        });
        test("should return an error message", async () => { // TODO
            expect(true).toBe(true);
        });
    });
});

// test deleting preferences
describe("DELETE /problem", () => {
    describe("given a user with problems submitted", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .delete("/api/problem")
                .send({
                    username: username
                });
            expect(response.statusCode).toBe(200);

            await deleteUserAfterTest();
            await deleteProblemsAfterTest();
        });
        test("should return a success message", async () => { // TODO
            expect(true).toBe(true);
        });
        test("all user's problems should be deleted from DB", async () => { // TODO
            expect(true).toBe(true);
        });
    });
});

// delete the user's problems
async function deleteProblemsAfterTest() {
    await request(test_app)
        .delete("/api/problem")
        .send({
            username: username
        });
}

// delete the user after the test is run
async function deleteUserAfterTest() {
    const loginResponse = await login();

    const userId = loginResponse._body._id;
    const JWTToken = loginResponse._body.accessToken;

    await request(test_app)
        .delete("/api/users/" + userId)
        .set("token", "Bearer " + JWTToken)
        .send();
}

// delete the user after the test is run
async function login() {
    const loginResponse = await request(test_app)
        .post("/api/auth/login")
        .send({
            loginMethod: username,
            password: password,
        });
    return loginResponse;
}

// create a user for tests
async function createUser() {
    const resp = await request(test_app)
        .post("/api/auth/register")
        .send({
            username: username,
            email: email,
            phone: phone,
            password: password,
            isAdmin: isAdmin
        });
}