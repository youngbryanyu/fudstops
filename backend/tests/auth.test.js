// unit tests for auth API endpoints
const test_app = require("../testModule");
const request = require("supertest");
const crypto = require("crypto");
// const assert = require("assert");

// user info constants for tests
const email = "auth@test.com";
const username = "auth123";
const password = "auth123";
// const phone = Math.floor(1000000000 + Math.random() * 900000000);
const phone = "0000000000"
const isAdmin = false;

// test register API
describe("register: POST /auth/register", () => {
    describe("given a valid email and phone, username, and password combination", () => {
        test("should return a 201", async () => {
            const response = await request(test_app)
                .post("/api/auth/register")
                .send({
                    username: username,
                    email: email,
                    phone: phone,
                    password: password,
                    isAdmin: isAdmin
                });
            expect(response.statusCode).toBe(201);
        });
    });

    // same credentials, user aleady exists
    describe("given an invalid/existing email or phone, username, and password combination", () => {
        test("should return a 500", async () => {
            const response = await request(test_app)
                .post("/api/auth/register")
                .send({
                    username: username,
                    email: email,
                    phone: phone,
                    password: password,
                    isAdmin: isAdmin
                });
            expect(response.statusCode).toBe(500);
        });
    });
});

// test login API
describe("login: POST /auth/login", () => {
    describe("given a valid email and password", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: email,
                    password: password
                });
            expect(response.statusCode).toBe(200);
        });
    });

    describe("given an invalid email and password", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: email,
                    password: "invalid"
                });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("given a valid phone number and password", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: phone,
                    password: password
                });
            expect(response.statusCode).toBe(200);
        });
    });

    describe("given an invalid phone number and password", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: phone,
                    password: "invalid"
                });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("given a valid username and password", () => {
        test("should return a 200", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: username,
                    password: password
                });

            expect(response.statusCode).toBe(200);
        });
    });

    describe("given an invalid username and password", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: username,
                    password: "invalid"
                });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("given a nonexistent username", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: crypto.randomBytes(32).toString("hex"),
                    password: "invalid"
                });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("given a nonexistent phone number", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: crypto.randomBytes(32).toString("hex"),
                    password: "invalid"
                });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("given a nonexistent email", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .post("/api/auth/login")
                .send({
                    loginMethod: crypto.randomBytes(32).toString("hex"),
                    password: "invalid"
                });
            expect(response.statusCode).toBe(401);

            await deleteUserAfterTest();
        });
    });
});


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