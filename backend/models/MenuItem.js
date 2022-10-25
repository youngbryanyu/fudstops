// MenuItem.js - defines Schema model in database for menu item

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema( // create schema for Item in DB
    {
        ID: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        diningCourt: { type: [] }, //dining court that this menu item belongs to
        station: { type: [] }, //station served at
        mealType: { type: [] }, //breakfast, brunch, lunch, late lunch, or dinner
        dateServed: { type: Date }, //date that this item was served (tentative field)
        isVegetarian: { type: Boolean, required: false },
        allergens: { type: [], required: false },
        nutritionFacts: { type: [], required: false },
        ingredients: { type: String, required: false }
    }
);
module.exports = mongoose.model("MenuItem", MenuItemSchema); // (modelName, reference point)