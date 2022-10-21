// Location.js - defines Schema model in DB for a location
// Location.js - defines Schema model in DB for a location

// const mongoose = require("mongoose");

// const DiningCourtSchema = new mongoose.Schema( // create schema for Location in DB
//     {
//         name: { type: String, required: true, unique: true },
//         caption: { type: String, required: true },
//         description: { type: String, required: true },
//         stations: { type: [String], required: true },
//         locationImg: { type: String, required: true },
//         menuItems: { type: [ItemSchema], required: true }
//     }
// );

// module.exports = mongoose.model("Location", DiningCourtSchema); // (modelName, reference point)
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema( // create schema for Location in DB
    { 
        name: { type: String, required: true, unique: true },
        caption: { type: String, required: true },
        description: { type: String, required: true },
        stations: { type: [String], required: true },
        locationImg: { type: String, required: true },
        menuItems: { type: [MenuItemSchema], required: true }
    }
);

module.exports = mongoose.model("Location", LocationSchema); // (modelName, reference point)