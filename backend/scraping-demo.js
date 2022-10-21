const cheerio = require("cheerio")
const afterLoad  = require("after-load")
const fetch = require('node-fetch')

/*
AARON KIM DEMO FILE -- NOT TO BE INCLUDED IN FINAL PRODUCT
-- Demonstrates scraping and parsing of purdue menus API XML files
-- Prints items and names for each Dining Court
*/

var d = new Date();
var today = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/"
const names = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"]
//iterate through all dining court URLS
async function scrape() {
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
            var menuItems = []
            //iterate through keys, slice url and append key, parse xml to json
            for(const key of itemKeys) {
                const parseUrl = "https://api.hfs.purdue.edu/menus/v2/items/" + key.slice(12)
                // console.log(parseUrl)
                const response = await fetch(parseUrl)
                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`)
                }

                const json = await response.json()
                menuItems.push(json.Name)
				menuItems.push(json.Allergens)
                menuItems.push(json.IsVegetarian)

                //debug/demo:
                // console.log("Name: ", json.Name)
                // console.log("Nutrition: ", json.Nutrition)
                // console.log("Allergens: ", json.Allergens)
                // console.log("Vegetarian? ", json.isVegetarian)

            }
            console.log("Dining court: " + name + " Menu on " + today)
            if (!menuItems || !menuItems.length) {
                console.log('Not serving today.')
            }
            for(const item of menuItems) {
                console.log(item)
            }
            console.log('=======================================')

        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
}
scrape()


/* 
FUDSTOPS

M - MongoDB -- database Sequence Query Language -- GET .. 
E - Express
R
N
*/