// defines Schema model in DB for a reported problem
const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema( // create schema for preferneces in DB
    {
        username: { type: String, required: true },
        problem: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema); // (modelName, reference point)