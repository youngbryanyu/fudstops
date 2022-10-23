// defines Schema model in DB for a preference
const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema( // create schema for preferneces in DB
    {
        username: { type: String, required: true, unique: true },
        preferences: { type: [], required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Preference", PreferenceSchema); // (modelName, reference point)