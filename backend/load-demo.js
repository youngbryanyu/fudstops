// const cheerio = require("cheerio");
// const afterLoad  = require("after-load");
// const fetch = require('node-fetch');

// /*
// AARON KIM DEMO FILE -- NOT TO BE INCLUDED IN FINAL PRODUCT
// */

// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// var date = new Date();

// console.log(date.addDays(5));

// var d = new Date();
// var today = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/";
// // all locations and open times:
// //https://api.hfs.purdue.edu/menus/v2/locations
// //all menu items and keys:
// //https://api.hfs.purdue.edu/menus/v2/locations/Earhart/2022-10-22 
// //specific menu item information:
// //https://api.hfs.purdue.edu/menus/v2/items/<key>
// async function load() {
//     console.log("======================================================================================================================")
//     const outerUrl = "https://api.hfs.purdue.edu/menus/v2/locations";
//     try { //parse outer xml
//         const outerResponse = await fetch(outerUrl);
//         if (!outerResponse.ok) {
//             throw new Error(`Error! status: ${outerResponse.status}`);
//         }
//         const outerJson = await outerResponse.json(); //outer information stored in outer json
//         //debug: console.log(outerJson);
//         for(object of outerJson.Location){
//             var name = object.Name;
//             console.log(name);
//         }
//     } catch (err) {
//         //res.status(500).json(err);
//         console.log(err);
//     }
//     console.log("======================================================================================================================")
// }
// load()

const fetch = require('node-fetch')

/*
AARON KIM DEMO FILE -- NOT TO BE INCLUDED IN FINAL PRODUCT
-- Demonstrates scraping and parsing of purdue menus API XML files
-- Prints items and names for each Dining Court
*/

var d = new Date();
var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
const names = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"]
//iterate through all dining court URLS
async function load() {
    for (const name of names) {
        //=========SCRAPING==========
        const outerUrl = "https://api.hfs.purdue.edu/menus/v2/locations/" + name + "/" + today
        // debug: console.log(outerUrl)
        try { //parse outer xml
            const outerResponse = await fetch(outerUrl);
            if (!outerResponse.ok) {
                throw new Error(`Error! status: ${outerResponse.status}`);
            }
            const outerJson = await outerResponse.json(); //outer information stored in outer json
            // debug: console.log(outerJson);    
            
            var menuItems = [];
            //iterate through keys, slice url and append key, parse xml to json
            for(const meal of outerJson.Meals) {
                menuItems.push("Serving " + meal.Name)
                for(const station of meal.Stations) {
                    for(const item of station.Items) {
                        const innerUrl = "https://api.hfs.purdue.edu/menus/v2/items/" + item.ID
                        // console.log(innerUrl)
                        const response = await fetch(innerUrl)
                        if (!response.ok) {
                            throw new Error(`Error! status: ${response.status}`)
                        }
        
                        const json = await response.json()
                        menuItems.push(json.Name)
                        //debug/demo:
                        // console.log("Name: ", json.Name)
                        // console.log("Nutrition: ", json.Nutrition)
                        // console.log("Allergens: ", json.Allergens)
                        // console.log("Vegetarian? ", json.isVegetarian)
                    }
                }
                menuItems.push("--------------------")
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
            // res.status(500).json(err);
            console.log(err);
        }
    }
}
load()
