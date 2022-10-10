// Location.js - defines Schema model in DB for a location

const mongoose = require("mongoose");

const NutritionFactSchema = new mongoose.Schema( // create schema for NutritionFact in DB
    { 
        name: { type: String, required: true },
        labelValue: { type: String, required: false },
        dailyValue: { type: Number, required: false },
        ordinal: { type: Number, required: false },
        value: { type: Number, required: false }
    }
);

const AllergenSchema = new mongoose.Schema( // create schema for Allergen in DB
    { 
        name: { type: String, required: true },
        value: { type: Boolean, required: true }
    }
);

const ItemSchema = new mongoose.Schema( // create schema for Item in DB
    { 
        name: { type: String, required: true },
        value: { type: String, required: true },
        isVegetarian: { type: Boolean, required: true },
        allergens: { type: [AllergenSchema], required: true },
        nutritionFacts: { type: [NutritionFactSchema], required: true },
        ingredients: { type: String, required: true }
    }
);

const LocationSchema = new mongoose.Schema( // create schema for Location in DB
    { 
        name: { type: String, required: true, unique: true },
        caption: { type: String, required: true },
        description: { type: String, required: true },
        stations: { type: [String], required: true },
        locationImg: { type: String, required: true },
        menuItems: { type: [ItemSchema], required: true }
    }
);

module.exports = mongoose.model("Location", LocationSchema); // (modelName, reference point)