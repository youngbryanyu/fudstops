// defines Schema model in DB for a saved item
const mongoose = require("mongoose");

const SavedSchema = new mongoose.Schema( // create schema for ratings in DB
    {
        username: { type: String, required: true },   
        menuItemID: { type: String, required: true },
        saved: { type: Boolean, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Saved", SavedSchema);