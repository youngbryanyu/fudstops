const router = require("express").Router();
const fetch = require('node-fetch');
const MenuItem = require('../models/MenuItem');
const Preference = require("../models/Preference");
const Restriction = require("../models/Restriction");


const DINING_COURTS = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"];
const PURDUE_DINING_URL = "https://dining.purdue.edu/menus/"; //unused
const PURDUE_DINING_API_URL_MENU_ITEMS = "https://api.hfs.purdue.edu/menus/v2/items/";
const PURDUE_DINING_API_URL_DINING_COURTS = "https://api.hfs.purdue.edu/menus/v2/locations/";


//LOAD - load menus site for current day
router.post("/load", async (req, res) => { // use async/await to ensure request is fulfilled before writing to DB
    var d = new Date();
    var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    // Parse dining items for each dining court
    for (const diningCourt of DINING_COURTS) {
        const outerUrl = PURDUE_DINING_API_URL_DINING_COURTS + diningCourt + "/" + today;
        try {
            const outerResponse = await fetch(outerUrl);
            if (!outerResponse.ok) {
                throw new Error(`Error! status: ${outerResponse.status}`);
            }
            const outerJson = await outerResponse.json(); //outer information stored in outer json
            // debug: console.log(outerJson);    
            //iterate through keys and parse
            for (const meal of outerJson.Meals) {
                const type = meal.Type;
                for (const station of meal.Stations) {
                    const stationname = station.Name;
                    for (const item of station.Items) {
                        const parseUrl = PURDUE_DINING_API_URL_MENU_ITEMS + item.ID;

                        // console.log(parseUrl)
                        const response = await fetch(parseUrl);
                        if (!response.ok) {
                            throw new Error(`Error! status: ${response.status}`)
                        }

                        const json = await response.json();

                        const courtdata = [diningCourt, stationname, type]

                        try {
                            const menuItem = await MenuItem.findOne({
                                ID: json.ID
                            });
                            if (menuItem) { // if menu item already exists, update it with possibly new information
                                await MenuItem.findByIdAndUpdate(menuItem._id, { $push: { courtData: courtdata } }, {
                                    ID: json.ID,
                                    name: json.Name,
                                    dateServed: today,
                                    isVegetarian: json.IsVegetarian,
                                    allergens: json.Allergens,
                                    nutritionFacts: json.Nutrition,
                                    ingredients: json.Ingredients
                                });
                                console.log("Updated menu item - " + diningCourt + ": " + json.Name);
                            } else {// create new MenuItem for current menu item
                                const newMenuItem = new MenuItem({
                                    ID: json.ID,
                                    name: json.Name,
                                    courtData: [courtdata],
                                    dateServed: today,
                                    isVegetarian: json.IsVegetarian,
                                    allergens: json.Allergens,
                                    nutritionFacts: json.Nutrition,
                                    ingredients: json.Ingredients
                                });

                                const item = await newMenuItem.save();
                                //menuItems.push(item) // push to menu (taken out for now)
                                // res.status(201).json(item); //return item in DB response to JSON
                                console.log("Added menu item - " + diningCourt + ": " + json.Name);
                            }
                        } catch (err) {
                            // res.status(500).json(err);
                            console.log("Error occured while parsing and saving data");
                        }
                    }
                }

            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
    res.status(201).json("Dining data was parsed successfully for " + today);
    console.log("Dining data was parsed successfully for " + today);
});

// this endpoint returns all menu items of the provided dining court
router.get("/:diningCourt", async (req, res) => {

    try {

        const menuItems = await MenuItem.find({});

        if (!menuItems) { //this means items were not found

            res.status(500).json("No items found");
            return;

        }

        let courtsItems = [];

        menuItems.forEach((item) => {

            let courtsArray = item.courtData;
            let skip = false;

            if (courtsArray == null) return;

            courtsArray.forEach((court) => {

                if (!skip && court.includes(req.params.diningCourt)) {
                    courtsItems.push(item);
                    skip = true;
                }

            });

        });

        res.status(200).json(courtsItems);


    } catch (error) { console.log(error); }

});

// this endpoint returns all menu items of the provided dining court that aligns 
// with a user's dietary preferences
router.get("/prefs/:diningCourt", async (req, res) => {

    try {

        const prefResponse = await Preference.findOne({
            username: req.body.username
        });
        const restResponse = await Restriction.findOne({
            username: req.body.username
        });

        const preferences = prefResponse.preferences;
        const restrictions = restResponse.restrictions;

        const menuItems = await MenuItem.find();

        if (!menuItems) { //this means items were not found

            res.status(500).json("No items found");
            return;

        }

        let courtsItems = [];

        menuItems.forEach((item) => {

            let courtsArray = item.courtData;
            let skip = false;

            if (courtsArray == null) return;

            courtsArray.forEach((court) => {

                if (!skip && court.includes(req.params.diningCourt)) {
                    allergens = item.allergens;
                    let matchesPrefs = true;

                    /* if doesn't match all restrictions then continue */
                    if (restrictions.length > 0) {
                        if (allergens.length === 0) {
                            matchesPrefs = false;
                        }
                        for (const allergen of allergens) {
                            if (restrictions.includes(allergen.Name) && allergen.Value === false) {
                                matchesPrefs = false;
                                break;
                            }
                        }
                    }

                    /* if doesn't match all preferences then continue */
                    if (preferences.length > 0) {
                        if (allergens.length === 0) {
                            matchesPrefs = false;
                        }
                        for (const allergen of allergens) {
                            if (preferences.includes(allergen.Name) && allergen.Value === false) {
                                matchesPrefs = false;
                                break;
                            }
                        }
                    }

                    if (matchesPrefs) {
                        courtsItems.push(item);
                        skip = true;
                    }
                }

            });

        });

        res.status(200).json(courtsItems);


    } catch (error) { console.log(error); }

});

module.exports = router;
