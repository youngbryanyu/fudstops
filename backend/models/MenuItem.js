// MenuItem.js - defines Schema model in database for menu item

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

const MenuItemSchema = new mongoose.Schema( // create schema for Item in DB
    {
        ID: { type: String, required: true },
        name: { type: String, required: true },
        value: { type: String, required: false },
        isVegetarian: { type: Boolean, required: false },
        allergens: { type: [AllergenSchema], required: false },
        nutritionFacts: { type: [NutritionFactSchema], required: false },
        ingredients: { type: String, required: false }
    }
);
module.exports = mongoose.model("MenuItem", MenuItemSchema); // (modelName, reference point)