// MenuItem.js - defines Schema model in database for menu item

const mongoose = require("mongoose");
// ----Aaron: these are unneeded-----
// const NutritionFactSchema = new mongoose.Schema( // create schema for NutritionFact in DB
//     {
//         name: { type: String, required: true },
//         labelValue: { type: String, required: false },
//         dailyValue: { type: Number, required: false },
//         ordinal: { type: Number, required: false },
//         value: { type: Number, required: false }
//     }
// );
// const AllergenSchema = new mongoose.Schema( // create schema for Allergen in DB
//     {
//         name: { type: String, required: true },
//         value: { type: Boolean, required: true }
//     }
// );

const MenuItemSchema = new mongoose.Schema( // create schema for Item in DB
    {
        ID: { type: String, required: true },
        name: { type: String, required: true },
        diningCourt: { type: String }, //dining court that this menu item belongs to
        dateServed: { type: Date }, //date that this item was served (tentative field)
        isVegetarian: { type: Boolean, required: false },
        allergens: { type: [], required: false },
        nutritionFacts: { type: [], required: false },
        ingredients: { type: String, required: false }
    }
);
module.exports = mongoose.model("MenuItem", MenuItemSchema); // (modelName, reference point)