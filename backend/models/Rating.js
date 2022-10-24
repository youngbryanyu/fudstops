// defines Schema model in DB for a restriction
const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema( // create schema for ratings in DB
    {
        username: { type: String, required: true },   
        menuItemID: { type: String, required: true },
        rating: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema); 