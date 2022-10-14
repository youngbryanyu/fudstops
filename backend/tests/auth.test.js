// unit tests for auth API endpoints
const app = require("../index");
const request = require("supertest");
const crypto = require("crypto");
// const assert = require("assert");

// user info constants for tests
const email = "test123@test.com";
const username = "test123";
const password = "test123";
const phone = "1231231234";
const isAdmin = false;

// test register API
describe("POST /register", () => {
    describe("given a valid email and phone, username, and password combination", () => {
        test("should return a 201", async () => {
            const response = await request(app)
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
            const response = await request(app)
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
describe("POST /login", () => {
    describe("given a valid email and password", () => {
        test("should return a 200", async () => {
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
            const response = await request(app)
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
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            loginMethod: username,
            password: password,
        });

    const userId = loginResponse._body._id;
    const JWTToken = loginResponse._body.accessToken;

    await request(app)
        .delete("/api/users/" + userId)
        .set("token", "Bearer " + JWTToken)
        .send();
}