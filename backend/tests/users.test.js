// unit tests for users API endpoints
const test_app = require("../testModule");
const request = require("supertest");
const crypto = require("crypto");
// const assert = require("assert");

// user info constants for tests
const email = "users@test.com";
const username = "users";
const password = "users";
const phone = "0000000001";
const isAdmin = false;

// test update API
describe("update user: PUT /users/:id", () => {
    describe("given the user has logged in and updates one of their attributes", () => {
        test("should return a 201", async () => {
            await createUser();
            const loginResponse = await login();

            const userId = loginResponse._body._id;
            const JWTToken = loginResponse._body.accessToken;

            const response = await request(test_app)
                .put("/api/users/" + userId)
                .set("token", "Bearer " + JWTToken)
                .send({
                    isAdmin: !isAdmin
                });
            expect(response.statusCode).toBe(200);
        });
    });

    describe("given the user has not logged in and updates one of their attributes", () => {
        test("should return a 401", async () => {
            await createUser();
            const loginResponse = await login();

            const userId = loginResponse._body._id;

            const response = await request(test_app)
                .put("/api/users/" + userId)
                .send({
                    isAdmin: !isAdmin
                });
            expect(response.statusCode).toBe(401);
        });
    });

    describe("given the user has not logged in and tries to modify their account", () => {
        test("should return a 401", async () => {
            await createUser();
            const loginResponse = await login();

            const userId = loginResponse._body.accessToken;

            const response = await request(test_app)
                .put("/api/users/" + userId)
                .send({
                    isAdmin: !isAdmin
                });
            expect(response.statusCode).toBe(401);
        });
    });
});

// test get API
describe("get user: GET /users/find/:id", () => {
    describe("given the user is logged in and gets his/her own data", () => {
        test("should return a 200", async () => {
            const loginResponse = await login();

            const userId = loginResponse._body._id;
            const JWTToken = loginResponse._body.accessToken;

            const response = await request(test_app)
                .get("/api/users/find/" + userId)
                .set("token", "Bearer " + JWTToken)
                .send();
            expect(response.statusCode).toBe(200);
        });
    });

    // describe("given the user is not logged in and gets his/her own data", () => {
    //     test("should return a 401", async () => {
    //         const loginResponse = await login();

    //         const userId = loginResponse._body._id;

    //         const response = await request(test_app)
    //             .get("/api/users/find/" + userId)
    //             .send();
    //         expect(response.statusCode).toBe(401);
    //     });
    // }); // TODO: figure out security token for get --> messes up personal information page
});

// test get all API
describe("get all users: GET /users", () => {
    describe("given the admin user is logged in and gets everyone's data", () => {
        test("should return a 200", async () => {
            const loginResponse = await login();

            const userId = loginResponse._body._id;
            const JWTToken = loginResponse._body.accessToken;

            await request(test_app)
                .put("/api/users/" + userId)
                .set("token", "Bearer " + JWTToken)
                .send({
                    isAdmin: !isAdmin // set user to admin
                });

            const response = await request(test_app)
                .get("/api/users")
                .set("token", "Bearer " + JWTToken)
                .send();

            await request(test_app)
                .put("/api/users/" + userId)
                .set("token", "Bearer " + JWTToken)
                .send({
                    isAdmin: !isAdmin // remove user from admin
                });

            expect(response.statusCode).toBe(200);
        });
    });

    describe("given the admin user is not logged in and gets everyone's data", () => {
        test("should return a 401", async () => {
            const response = await request(test_app)
                .get("/api/users")
                .send();
            expect(response.statusCode).toBe(401);
        });
    });
});

// test delete API
describe("delete user: DELETE /users/:id", () => {

    describe("given the user not is logged in, they should not be able to delete their account", () => {
        test("should return a 401", async () => {
            const loginResponse = await login();

            const userId = loginResponse._body._id;

            const response = await request(test_app)
                .delete("/api/users/" + userId)
                .send();

            expect(response.statusCode).toBe(401);
        });
    });
    describe("given the user is logged in, they should be able to delete their account", () => {
        test("should return a 200", async () => {
            const loginResponse = await login();

            const userId = loginResponse._body._id;
            const JWTToken = loginResponse._body.accessToken;

            const response = await request(test_app)
                .delete("/api/users/" + userId)
                .set("token", "Bearer " + JWTToken)
                .send();
            expect(response.statusCode).toBe(200);
            await deleteUserAfterTest(); // delete user after test
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
    await request(test_app)
        .post("/api/auth/register")
        .send({
            username: username,
            email: email,
            phone: phone,
            password: password,
            isAdmin: isAdmin
        });
}