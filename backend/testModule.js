// testing server module
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const passwordResetRoute = require("./routes/passwordReset");

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

app.listen(0, () => { // start server, find any available port, listen for connections
    console.log("backend is running");
});

module.exports = app;