// unit tests for menuInfo API endpoints
const test_app = require("../testModule");
const request = require("supertest");

// user info constants for tests
const email = "menuInfo@test.com";
const username = "menuInfo";
const password = "menuInfo";
const phone = "0000000006"
const isAdmin = false;

const DINING_COURT = "Wiley";

// get menu items that align with user's prefs/rest from a dining court
describe("GET /menuInfo/prefs/:diningCourt/:username", () => {
    describe("given a valid user", () => {
        test("should return a 200 with all the menu items aligning with their preferences", async () => {
            await createUser();
            await login();

            const response = await request(test_app)
                .get("/api/menuInfo/prefs/" + DINING_COURT + "/" + username)
                .send();
            expect(response.statusCode).toBe(200);
        });
        test("should return all the menu items aligning with their preferences", async () => { // TODO
            expect(true).toBe(true);
        });
    });
    describe("given an invalid user", () => {
        test("should return a 500 with the error", async () => {
            const response = await request(test_app)
                .get("/api/menuInfo/prefs/" + DINING_COURT + "/invalid_username")
                .send();
            expect(response.statusCode).toBe(500);

            await deleteUserAfterTest();
        });
        test("should return an error message", async () => { // TODO
            expect(true).toBe(true);
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