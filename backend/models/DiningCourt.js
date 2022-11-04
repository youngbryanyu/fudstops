// DiningCourt.js - defines Schema model in DB for a location

const mongoose = require("mongoose");

const DiningCourtSchema = new mongoose.Schema( // create schema for Location in DB
    {
        name: { type: String, required: true, unique: true },
        formalName: { type: String },
        mealInfo: { type: Object }, //{meal name, start time, end time}
        // caption: { type: String, required: true },
        // description: { type: String, required: true },
        // stations: { type: [String], required: true },
        // locationImg: { type: String, required: true },
        // menuItems: { type: [ItemSchema], required: true }
    }
);

module.exports = mongoose.model("DiningCourt", DiningCourtSchema); // (modelName, reference point)