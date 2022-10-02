// index.js - entry point for all node apps, in react it's just what to render and where 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");


dotenv.config();

mongoose
    .connect( // connect to MongoDB database
        process.env.MONGO_URL, { // to hide DB credentials
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("DB connection successful"))
    .catch(err=>console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute); // endpoint for authRoute
app.use("/api/users", userRoute); // endpoint for userRoute


app.listen(8000, ()=>{ // start server, listen for connections
    console.log("backend is running");
});

