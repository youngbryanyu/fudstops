// unit tests for passwordReset API endpoints
const test_app = require("../testModule");
const request = require("supertest");
const ResetPasswordToken = require("../models/ResetPasswordToken");
// const assert = require("assert");

// user info constants for tests
const email = "forgotPasswordReset@test.com";
const username = "forgotPasswordReset";
let password = "forgotPasswordReset";
const phone = "5104888108";
const isAdmin = false;

const resetTokenValue = "12345";

// test send reset password link API
describe("send password reset link: POST /forgotPasswordReset", () => {
    describe("given a valid username and the user tries to get a password reset link", () => {
        test("should return a 200", async () => {
            await createUser();
            const loginResponse = await login();
            const userId = loginResponse._body._id;

            token = await new ResetPasswordToken({ // store a custom reset token
                userId: userId,
                token: resetTokenValue
            }).save();

            const response = await request(test_app)
                .post("/api/forgotPasswordReset")
                .send({
                    emailOrPhoneOrUsername: username,
                    userId: userId
                });
            expect(response.statusCode).toBe(200);
        });
    });
});

// test verify token and user id
describe("verify token and user: GET /forgotPasswordReset/:id/:token", () => {
    describe("given an invalid user id and/or token", () => {
        test("should return a 400", async () => {
            const response = await request(test_app)
                .get("/api/forgotPasswordReset/invalid_user/invalid_token")
                .send();
            expect(response.statusCode).toBe(400);
        });
    });

    describe("given a valid user id and/or token", () => {
        test("should return a 200", async () => {
            const loginResponse = await login();
            const userId = loginResponse._body._id; // get user id

            const link = "/api/forgotPasswordReset/" + userId + "/" + resetTokenValue;
            const response = await request(test_app)
                .get(link)
                .send();
            expect(response.statusCode).toBe(200);
        });
    });
});

// test reset password
describe("reset password: POST /forgotPasswordReset/:id/:token", () => {
    describe("given an invalid user id and/or token", () => {
        test("should return a 400", async () => {
            const response = await request(test_app)
                .post("/api/forgotPasswordReset/invalid_user/invalid_token")
                .send();
            expect(response.statusCode).toBe(400);
        });
    });

    describe("given a valid user id and/or token", () => {
        test("should return a 200", async () => {
            const loginResponse = await login();
            const userId = loginResponse._body._id; // get user id

            const link = "/api/forgotPasswordReset/" + userId + "/" + resetTokenValue;
            const response = await request(test_app)
                .post(link)
                .send({
                    password: "new_password"
                });
                password = "new_password"; // reset global password var
            expect(response.statusCode).toBe(200);
            await deleteUserAfterTest(); // delete temp user after last test
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