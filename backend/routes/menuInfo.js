const router = require("express").Router();
const fetch = require('node-fetch');
const MenuItem = require('../models/MenuItem');
const Preference = require("../models/Preference");
const Restriction = require("../models/Restriction");
const User = require("../models/User");

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

/*

this endpoint returns all items that align with the requested preferences
the request body must include the requested preferences

req url -> http://localhost:8000/api/menuInfo/prefs
Example req body below

{
    "preferences": ["Vegan"]
}

^ that call + body will give all items that are Vegan

*/
router.get("/prefs", async (req, res) => {
    var d = new Date();
    var today = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

    try {
        const prefs = req.body.preferences; //for example could be - "Vegan", "Vegetarian"
        const menuItems = await MenuItem.find({}); //all menu items

        if (!menuItems) { //this means items were not found

            res.status(500).json("No items found");
            return;

        }

        if (prefs.length == 0) { //no preferences provided, so all items work
            console.log("0 lenght");
            res.status(200).json(menuItems);
            return;
        }

        let prefItems = [];

        menuItems.forEach((item) => { //for each item we check if it matches all preferences

            let allergens = item.allergens;
            let skipPrefs = false;

            if (allergens == null || allergens.length == 0) skipPrefs = true;

            allergens.forEach((allergen) => {

                if (!skipPrefs && prefs.includes(allergen.Name) && allergen.Value == false) {

                    skipPrefs = true;

                }

            });

            if (!skipPrefs && item.dateServed.getTime() === today.getTime()) prefItems.push(item); //if we found that the item aligned with req prefs

        });

        res.status(200).json(prefItems);

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

/*
//this endpoint returns all of today's items that align with the requested restrictions
//the request body must include the requested restrictions

req url -> http://localhost:8000/api/menuInfo/rests
Example req body below

{
    "restrictions": ["Coconut", "Tree Nuts"]
}

^ that call + body will give all items that don't have Coconut or Tree Nuts in it

*/
router.get("/rests", async (req, res) => {
    var d = new Date();
    var today = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

    try {

        const rests = req.body.restrictions; //for example could be - "Coconut", "Peanuts"
        const menuItems = await MenuItem.find({}); //all menu items

        if (!menuItems) { //this means items were not found

            res.status(500).json("No items found");
            return;

        }

        if (rests.length == 0) { //no preferences provided, so all items work
            res.status(200).json(menuItems);
            return;
        }

        let restsItems = [];

        menuItems.forEach((item) => { //for each item we check if it matches all preferences

            let allergens = item.allergens;
            let skipRests = false;

            if (allergens == null || allergens.length == 0) skipRests = true;

            allergens.forEach((allergen) => {

                if (!skipRests && rests.includes(allergen.Name) && allergen.Value == true) {

                    skipRests = true;

                }

            });

            if (!skipRests && item.dateServed.getTime() === today.getTime()) restsItems.push(item); //if we found that the item aligned with req prefs

        });

        res.status(200).json(restsItems);

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

});

/*
//this endpoint returns all items that align with the requested restrictions and preferences
//the request body must include the requested restrictions & preferences
//created the other functions in case both prefs & rests are not needed to be filtered

req url -> http://localhost:8000/api/menuInfo/prefsAndRests
Example req body below

{
    "preferences": ["Vegan"],
    "restrictions": ["Coconut", "Tree Nuts"]
}

^ that call + body will give all items that don't have Coconut or Tree Nuts in it and that are Vegan

*/
router.post("/prefsAndRests/:diningCourt", async (req, res) => {
    var d = new Date();
    var today = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

    try {

        const rests = req.body.restrictions; //for example could be - "Coconut", "Peanuts"
        const prefs = req.body.preferences; //for example could be - "Vegan"
        const menuItems = await MenuItem.find({}); //all menu items

        if (!menuItems) { //this means items were not found

            res.status(500).json("No items found");
            return;

        }

        if (rests.length == 0 && prefs.length == 0) { //no prefs or rests provided, so all items work
            res.status(200).json(menuItems);
            return;
        }

        let courtsItems = [];

        menuItems.forEach((item) => { //first get all the diningCourts items

            let courtsArray = item.courtData;
            let skip = false;

            if (courtsArray == null) return;

            courtsArray.forEach((court) => {

                if (!skip && court.includes(req.params.diningCourt) && item.dateServed.getTime() === today.getTime()) {
                    courtsItems.push(item);
                    skip = true;
                }

            });

        }); 

        //then find out the rests & prefs

        let matchingItems = [];

        courtsItems.forEach((item) => { //for each item we check if it matches all preferences

            let allergens = item.allergens;
            let skipRests = false;
            let skipPrefs = false;

            //these if-checks below are testing edge cases
            if (allergens == null) {
                skipRests = true;
                skipPrefs = true;
            }
            if (allergens.length == 0 && (prefs.length != 0 || rests.length != 0)) {
                skipRests = true;
                skipPrefs = true;
            }

            allergens.forEach((allergen) => { //first check rests criteria

                if (!skipRests && rests.includes(allergen.Name) && allergen.Value == true) {

                    skipRests = true;

                }

            });

            if (!skipRests) { //if the item passes all the requested rests

                allergens.forEach((allergen) => { //then we check if it passes the requested prefs

                    if (!skipPrefs && prefs.includes(allergen.Name) && allergen.Value == false) {

                        skipPrefs = true;

                    }

                });

                if (!skipPrefs && item.dateServed.getTime() === today.getTime()) matchingItems.push(item); //this item matches both prefs & rests

            }


        });

        res.status(200).json(matchingItems);

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

});

// this endpoint returns all menu items of the provided dining court
router.get("/:diningCourt", async (req, res) => {
    var d = new Date();
    var today = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

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

                if (!skip && court.includes(req.params.diningCourt) && item.dateServed.getTime() === today.getTime()) {
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
router.get("/prefs/:diningCourt/:username", async (req, res) => {
    var d = new Date();
    var today = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());

    console.log("today is " + d);
    try {
        const user = await User.findOne({
            username: req.params.username
        });

        if (!user) {
            res.status(500).json("User doesn't exist");
            return;
        }

        const prefResponse = await Preference.findOne({
            username: req.params.username
        });
        const restResponse = await Restriction.findOne({
            username: req.params.username
        });

        // get preferences from response
        let preferences;
        if (!prefResponse) {
            preferences = [];
        }
        else {
            preferences = prefResponse.preferences;
        }

        // get restrictions from response
        let restrictions;
        if (!restResponse) {
            restrictions = [];
        }
        else {
            restrictions = restResponse.restrictions;
        }

        const menuItems = await MenuItem.find();
        if (!menuItems || menuItems.length == 0) { //this means items were not found

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
                        if (allergens.length === 0) { /* edge case for when item has no allergen info */
                            matchesPrefs = false;
                        }
                        for (const allergen of allergens) {
                            if (restrictions.includes(allergen.Name) && allergen.Value === true) {
                                matchesPrefs = false;
                                break;
                            }
                        }
                    }

                    /* if doesn't match all preferences then continue */
                    if (preferences.length > 0) {
                        if (allergens.length === 0) { /* edge case for when item has no allergen info */
                            matchesPrefs = false;
                        }
                        for (const allergen of allergens) {
                            if (preferences.includes(allergen.Name) && allergen.Value === false) {
                                matchesPrefs = false;
                                break;
                            }
                        }
                    }
                    if (matchesPrefs && item.dateServed.getTime() === today.getTime()) {
                        courtsItems.push(item);
                        skip = true;
                    }
                }

            });

        });

        res.status(200).json(courtsItems);


    } catch (error) { console.log(error); }

});

/*

Returns a menu item based on the provided item ID

Example Call: http://localhost:8000/api/menuInfo/item/76f9d158-d45d-42e0-8e37-8bd3c2c45986
Returns this object: 
{

    ...
    "ID": "76f9d158-d45d-42e0-8e37-8bd3c2c45986",
    "name": "Scrambled Eggs With Bacon And Cheese"
    ...

}

*/
router.get("/item/:menuItemID", async (req, res) => {

    try{

        const menuItemID = req.params.menuItemID;
        
        const item = await MenuItem.findOne({
            ID: menuItemID
        });

        if(item == null) {
            res.status(500).json("No item found");
            return;
        }

        res.status(200).json(item);
        return;

    } catch(error) {

        res.status(500).json("Error: " + error);
        console.log("Error: " + error);

    }

})

module.exports = router;
