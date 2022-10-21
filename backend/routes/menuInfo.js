const router = require("express").Router();
const cheerio = require("cheerio")
const afterLoad  = require("after-load")
const fetch = require('node-fetch')
const MenuItem = require('../models/MenuItem')

//SCRAPE - scrape menus site and create new menu for the current day
router.post("/scrape", async (req, res) => { // use async/await to ensure request is fulfilled before writing to DB
    var d = new Date();
    var today = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/"
    const names = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"]
    //iterate through all dining court URLS
    for (const name of names) {
        const url = "https://dining.purdue.edu/menus/" + name + "/" + today
        try { //scrape and parse URL
            // fetch html of url
            const html = afterLoad(url)
            //load in html to cheerio
            const $ = cheerio.load(html)
            const itemKeys = []
            $('.station-item').each(function() {
                var item = $(this).attr('href')
                itemKeys.push(item)
            });
            //debug: console.dir(itemKeys)
            //var menuItems = [] //array of menuitems (not necessary atm because of diningcourt field in model)
            //iterate through keys, slice url and append key, parse xml to json
            for(const key of itemKeys) {
                const parseUrl = "https://api.hfs.purdue.edu/menus/v2/items/" + key.slice(12)
                // console.log(parseUrl)
                const response = await fetch(parseUrl)
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`)
                }

                const json = await response.json()
                
                //create new MenuItem for current menu item
                const newMenuItem = new MenuItem({
                    ID: json.ID,
                    name: json.Name,
                    diningCourt: name,
                    dateServed: today,
                    isVegetarian: json.IsVegetarian,
                    allergens: json.Allergens,
                    nutritionFacts: json.Nutrition,
                    ingredients: json.Ingredients
                });
                
                try {
                    const item = await newMenuItem.save();
                    //menuItems.push(item) //push to menu (taken out for now)
                    res.status(201).json(item); //return item in DB response to JSON
                } catch (err) {
                    res.status(500).json(err); // server error 500
                }
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
});
module.exports = router; 
