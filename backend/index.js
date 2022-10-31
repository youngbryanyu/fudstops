// index.js - entry point for all node apps, in react it's just what to render and where 
const express = require("express");
const app = express();
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
    .then(() => console.log("DB connection successful"))
    .catch(err => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute); // endpoint for authentication
app.use("/api/users", userRoute); // endpoint for users
app.use("/api/forgotPasswordReset", passwordResetRoute); // endpoint for resetting password if user forgot
app.use("/api/menuInfo", menuInfoRoute); // endpoint for menu information
app.use("/api/preference", preferenceRoute); // endpoint for preferences
app.use("/api/restriction", restrictionRoute); // endpoint for restrictions
app.use("/api/problem", problemRoute); // endpoint for reporting problems
app.use("/api/ratings", ratingsRoute); // endpoint for ratings

app.listen(8000, () => { // start server, listen for connections
    console.log("backend is running");
});

module.exports = app;