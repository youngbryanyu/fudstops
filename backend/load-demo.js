const { object } = require('joi');
const fetch = require('node-fetch');

/*
AARON KIM DEMO FILE -- NOT TO BE INCLUDED IN FINAL PRODUCT
*/

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();

console.log(date.addDays(5));

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var d = new Date();
var today = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/";
var todayDay = d.getDay();
//all menu items and keys:
//https://api.hfs.purdue.edu/menus/v2/locations/Earhart/2022-10-22 
//specific menu item information:
//https://api.hfs.purdue.edu/menus/v2/items/<key>

//Need this one:
// all locations and open times:
//https://api.hfs.purdue.edu/menus/v2/locations

const courts = ["Earhart", "Ford", "Hillenbrand", "Wiley", "Windsor"]
async function load() {
    const url = "https://api.hfs.purdue.edu/menus/v2/locations";
    //check if name is Earhart, Wiley, Windsor, Hillenbrand, Ford
    try { //parse outer xml
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const json = await response.json(); //outer information stored in outer json
        //debug: console.log(outerJson);
        for(var court of json.Location){
            if (!(courts.find(courtname => (courtname === court.Name)))) {
                continue
            }
            for (var day of court.NormalHours[0].Days) {
                if (day.Name !== days[todayDay]) {
                    continue
                }
                for (var meal of day.Meals) {
                    var name = meal.Name
                    var start = meal.Hours.StartTime
                    var end = meal.Hours.EndTime
                    var sh = start.split(":")[0]
                    var eh = end.split(":")[0]
                    var sm = start.split(":")[1]
                    var em = end.split(":")[1]
                    var startSuffix = sh >= 12 ? " PM" : " AM"
                    var endSuffix = eh >= 12 ? " PM" : " AM"
                    var mealstart = ((sh % 12) || 12) + ":" + sm + startSuffix
                    var mealend = ((eh % 12) || 12) + ":" + em + endSuffix

                    console.log(name)
                    console.log(meal.Hours.StartTime, meal.Hours.EndTime)
                    console.log(mealstart)
                    console.log(mealend)
                }
            }
        }
    } catch (err) {
        //res.status(500).json(err);
        console.log(err);
    }
}
load()

// const fetch = require('node-fetch')

/*
AARON KIM DEMO FILE -- NOT TO BE INCLUDED IN FINAL PRODUCT
-- Demonstrates scraping and parsing of purdue menus API XML files
-- Prints items and names for each Dining Court
*/

// var d = new Date();
// var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
// const names = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"]
// //iterate through all dining court URLS
// async function load() {
//     for (const name of names) {
//         //=========SCRAPING==========
//         const outerUrl = "https://api.hfs.purdue.edu/menus/v2/locations/" + name + "/" + today
//         // debug: console.log(outerUrl)
//         try { //parse outer xml
//             const outerResponse = await fetch(outerUrl);
//             if (!outerResponse.ok) {
//                 throw new Error(`Error! status: ${outerResponse.status}`);
//             }
//             const outerJson = await outerResponse.json(); //outer information stored in outer json
//             // debug: console.log(outerJson);    
            
//             var menuItems = [];
//             //iterate through keys, slice url and append key, parse xml to json
//             for(const meal of outerJson.Meals) {
//                 menuItems.push("Serving " + meal.Name)
//                 for(const station of meal.Stations) {
//                     for(const item of station.Items) {
//                         const innerUrl = "https://api.hfs.purdue.edu/menus/v2/items/" + item.ID
//                         // console.log(innerUrl)
//                         const response = await fetch(innerUrl)
//                         if (!response.ok) {
//                             throw new Error(`Error! status: ${response.status}`)
//                         }
        
//                         const json = await response.json()
//                         menuItems.push(json.Name)
//                         menuItems.push(json.Nutrition)                        //debug/demo:
//                         // console.log("Name: ", json.Name)
//                         // console.log("Nutrition: ", json.Nutrition)
//                         // console.log("Allergens: ", json.Allergens)
//                         // console.log("Vegetarian? ", json.isVegetarian)
//                     }
//                 }
//                 menuItems.push("--------------------")
//             }
//             console.log("Dining court: " + name + " Menu on " + today)
//             if (!menuItems || !menuItems.length) {
//                 console.log('Not serving today.')
//             }
//             for(const item of menuItems) {
//                 console.log(item)
//             }
//             console.log('=======================================')

//         } catch (err) {
//             // res.status(500).json(err);
//             console.log(err);
//         }
//     }
// }
// load()
