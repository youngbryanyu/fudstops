// unit tests for passwordReset API endpoints
const test_app = require("../testModule");
const request = require("supertest");
const ResetPasswordToken = require("../models/ResetPasswordToken");
// const assert = require("assert");

// user info constants for tests
const email = "vsahani007@test.com";
const username = "forgotPasswordReset";
const password = "forgotPasswordReset";
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

            deleteUserAfterTest();
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