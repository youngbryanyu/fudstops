const router = require("express").Router();
const fetch = require('node-fetch');
const MenuItem = require('../models/MenuItem');

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
                for (const station of meal.Stations){
                    for (const item of station.Items) {
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
