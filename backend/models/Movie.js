// Movie.js - defines Schema model in DB for a movie
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema( // create schema for User in DB
    { 
        title: { type: String, required: true, unique: true },
        desc: { type: String },
        img: { type: String }, // preview img
        imgTitle: { type: String }, // title/logo img
        imgSm: { type: String }, // thumbnail on movie list
        trailer: { type: String }, // trailer when hovering over
        video: { type: String }, // full movie
        year: { type: String },
        limit: { type: Number },
        genre: { type: String },
        isSeries: { type: Boolean, default: false } // movie or tv series
    }, 
    { timestamp: true }
);

module.exports = mongoose.model("Movie", MovieSchema); // (modelName, reference point)