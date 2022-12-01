// defines Schema model in DB for a saved item
const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema( // create schema for ratings in DB
    {
        username: { type: String, required: true },   
        optInRated: { type: Boolean, required: true },
        optInSaved: { type: Boolean, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notify", NotifySchema);