// index.js - entry point for all node apps, in react it's just what to render and where 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const schedule = require("node-schedule");

// API endpoint routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const passwordResetRoute = require("./routes/passwordReset");
const menuInfoRoute = require("./routes/menuInfo");
const preferenceRoute = require("./routes/preference");
const restrictionRoute = require("./routes/restriction");
const problemRoute = require("./routes/problem");
const ratingsRoute = require("./routes/ratings");
const savedRoute = require("./routes/saved");
const recommendationsRoute = require("./routes/recommendations");
const imagesRoute = require("./routes/image");

dotenv.config();

mongoose
    .connect( // connect to MongoDB database
        process.env.MONGO_URL, { // to hide DB credentials
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB connection successful"))
    .catch(err => console.log(err));

/* Use express JSON*/
app.use(express.json());

app.use("/api/auth", authRoute); // endpoint for authentication
app.use("/api/users", userRoute); // endpoint for users
app.use("/api/forgotPasswordReset", passwordResetRoute); // endpoint for resetting password if user forgot
app.use("/api/menuInfo", menuInfoRoute); // endpoint for menu information
app.use("/api/preference", preferenceRoute); // endpoint for preferences
app.use("/api/restriction", restrictionRoute); // endpoint for restrictions
app.use("/api/problem", problemRoute); // endpoint for reporting problems
app.use("/api/ratings", ratingsRoute); // endpoint for ratings
app.use("/api/saved", savedRoute); // endpoint for saved items
app.use("/api/recommendations", recommendationsRoute); // endpoint for recommended items
app.use("/api/image", imagesRoute); // endpoint for recommended items

/* Listen on port 8000 locally */
app.listen(8000, async () => {
    console.log("backend is running");
    try {
        // await axios.post('http://localhost:8000/api/menuInfo/load');
    } catch (error) {
        console.log("ERROR PARSING DINING DATA ON STARTUP: " + error);
    }
});

/* Parse dining data everyday at 12:01 am --> scheduler uses CRON formatting: https://crontab.guru/every-night-at-midnight */
schedule.scheduleJob('1 0 * * *', async () => {
    try {
        await axios.post('http://localhost:8000/api/menuInfo/load');
    } catch (error) {
        console.log("ERROR PARSING DINING DATA AT MIDNIGHT: " + error);
    }
});

module.exports = app;
