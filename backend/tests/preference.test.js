// unit tests for preferences API endpoints
const test_app = require("../testModule");
const request = require("supertest");

// user info constants for tests
const email = "preference@test.com";
const username = "preference";
const password = "preference";
const phone = "0000000004";
const isAdmin = false;
const initial_prefs = ["Vegan"];
const after_prefs = ["Vegan", "Vegetarian"];

// save/update preferences to/in DB
describe("POST /preference", () => {
    describe("given a user with no preferences", () => {
        test("should return a 201", async () => {
            await createUser();
            await login();

            const response = await request(test_app)
                .post("/api/preference")
                .send({
                    username: username,
                    preferences: initial_prefs
                });
            expect(response.statusCode).toBe(201);
        });
        test("should create new DB entry", async () => { // TODO
            expect(true).toBe(true);
        });
        test("should return a success message", async () => { // TODO
            expect(true).toBe(true);
        });
    });
    describe("given a user with existing preferences", () => {
        test("should return a 201", async () => {
            const response = await request(test_app)
                .post("/api/preference")
                .send({
                    username: username,
                    preferences: after_prefs
                });
            expect(response.statusCode).toBe(201);
        });
        test("should update existing DB entry", async () => { // TODO
            expect(true).toBe(true);
        });
        test("should return a success message", async () => { // TODO
            expect(true).toBe(true);
        });
    });
});

// test get preferences
describe("GET /preference/:username", () => {
    describe("given a user with preferences", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .get("/api/preference/" + username)
                .send();

            expect(response.statusCode).toBe(200);
        });
        test("should return user's preferences", async () => { // TODO
            expect(true).toBe(true);
        });
    });
    describe("given an invalid username", () => {
        test("should return a 500", async () => {
            const response = await request(test_app)
                .get("/api/preference/INVALID_USER")
                .send();

            expect(response.statusCode).toBe(500);
        });
        test("should return an error message", async () => { // TODO
            expect(true).toBe(true);
        });
    });
});

// test deleting preferences
describe("DELETE /preference", () => {
    describe("given a user with preferences", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .delete("/api/preference")
                .send({
                    username: username
                });

            expect(response.statusCode).toBe(200);

            await deleteUserAfterTest();
            await deletePreferencesAfterTest();
        });
        test("user's preferences should not exist in DB anymore", async () => { // TODO
            expect(true).toBe(true);
        });
    });
});

// delete the user's preferences
async function deletePreferencesAfterTest() {
    await request(test_app)
        .delete("/api/preference")
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

// login
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