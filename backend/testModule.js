// testing server module
const express = require("express");
const test_app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// API endpoint routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const passwordResetRoute = require("./routes/passwordReset");
const menuInfoRoute = require("./routes/menuInfo");
const preferenceRoute = require("./routes/preference");
const restrictionRoute = require("./routes/restriction");
const problemRoute = require("./routes/problem");
const ratingsRoute = require("./routes/ratings");

dotenv.config();

mongoose
    .connect( // connect to MongoDB database
        process.env.MONGO_URL, { // to hide DB credentials
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // .then(() => console.log("DB connection successful"))
    .catch(err => console.log(err));

test_app.use(express.json());

test_app.use("/api/auth", authRoute); // endpoint for authentication
test_app.use("/api/users", userRoute); // endpoint for users
test_app.use("/api/forgotPasswordReset", passwordResetRoute); // endpoint for resetting password if user forgot
test_app.use("/api/menuInfo", menuInfoRoute); // endpoint for menu information
test_app.use("/api/preference", preferenceRoute); // endpoint for preferences
test_app.use("/api/restriction", restrictionRoute); // endpoint for restrictions
test_app.use("/api/problem", problemRoute); // endpoint for reporting problems
test_app.use("/api/ratings", ratingsRoute); // endpoint for ratings

let server = test_app.listen(0, () => { // start server, find any available port, listen for connections
    // console.log("backend is running");
});

// close connections after test
afterAll(() => {
    mongoose.connection.close();
    server.close();
})

module.exports = test_app;