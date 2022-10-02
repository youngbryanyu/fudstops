// List.js - defines Schema model in DB for a list of movies
const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema( // create schema for User in DB
    { 
        title: { type: String, required: true, unique: true },
        type: { type: String }, // movie or tv series
        genre: { type: String },
        content: { type: Array } // movies in list
    }, 
    { timestamp: true }
);

module.exports = mongoose.model("List", ListSchema); // (modelName, reference point)