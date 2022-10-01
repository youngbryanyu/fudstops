// index.js - entry point for all node apps, in react it's just what to render and where 
const express = require("express");
const app = express(); // create express application
const mongoose = require("mongoose");

app.listen(8000, ()=>{ // start server, listen for connections
    console.log("backend is running");
});