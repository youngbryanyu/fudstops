// defines Schema model in DB for a restriction
const mongoose = require("mongoose");

const RestrictionSchema = new mongoose.Schema( // create schema for restrictions in DB
    {
        username: { type: String, required: true, unique: true },
        restrictions: { type: [], required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Restriction", RestrictionSchema); // (modelName, reference point)