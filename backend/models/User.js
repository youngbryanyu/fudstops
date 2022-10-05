// User.js - defines Schema model in DB for a user
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema( // create schema for User in DB
    { 
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic: { type: String, default: "" },
        isAdmin: { type: Boolean, default: false }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema); // (modelName, reference point)