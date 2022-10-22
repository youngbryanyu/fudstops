const router = require("express").Router();
const cheerio = require("cheerio");
const afterLoad = require("after-load");
const fetch = require('node-fetch');
const MenuItem = require('../models/MenuItem');

const DINING_COURTS = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"];
const PURDUE_DINING_URL = "https://dining.purdue.edu/menus/";
const PURDUE_DINING_API_URL_MENU_ITEMS = "https://api.hfs.purdue.edu/menus/v2/items/";
const PURDUE_DINING_API_URL_DINING_COURTS = "https://api.hfs.purdue.edu/menus/v2/locations/";


//SCRAPE - scrape menus site and create new menu for the current day
router.post("/scrape", async (req, res) => { // use async/await to ensure request is fulfilled before writing to DB
    var d = new Date();
    var today = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/";

    // Parse dining items for each dining court
    for (const diningCourt of DINING_COURTS) {
        const url = PURDUE_DINING_URL + diningCourt + "/" + today
        try {
            // fetch html of url
            const html = afterLoad(url);

            // load in html to cheerio
            const $ = cheerio.load(html);
            const itemKeys = [];
            $('.station-item').each(function () {
                var item = $(this).attr('href')
                itemKeys.push(item)
            });

            debug: console.dir(itemKeys);

            //var menuItems = [] //array of menuitems (not necessary atm because of diningcourt field in model)
            //iterate through keys, slice url and append key, parse xml to json
            for (const key of itemKeys) {
                const parseUrl = PURDUE_DINING_API_URL_MENU_ITEMS + key.slice(12);

                // console.log(parseUrl)
                const response = await fetch(parseUrl);
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`)
                }

                const json = await response.json();

                // console.log(json);

                // create new MenuItem for current menu item
                const newMenuItem = new MenuItem({
                    ID: json.ID,
                    name: json.Name,
                    diningCourt: diningCourt,
                    dateServed: today,
                    isVegetarian: json.IsVegetarian,
                    allergens: json.Allergens,
                    nutritionFacts: json.Nutrition,
                    ingredients: json.Ingredients
                });

                try {
                    const menuItem = await MenuItem.findOne({
                        ID: json.ID
                    });
                    if (menuItem) { // if menu item already exists, update it with possibly new information
                        await MenuItem.findByIdAndUpdate(menuItem._id, {
                            ID: json.ID,
                            name: json.Name,
                            diningCourt: diningCourt,
                            dateServed: today,
                            isVegetarian: json.IsVegetarian,
                            allergens: json.Allergens,
                            nutritionFacts: json.Nutrition,
                            ingredients: json.Ingredients
                        });
                        console.log("Updated menu item - " + diningCourt + ": " + json.Name);
                    } else {
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
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
    res.status(201).json("Dining data was parsed successfully for " + today);
    console.log("Dining data was parsed successfully for " + today);
});

module.exports = router;

// TODO: add which time of day the meal is: brunch, lunch, dinner
