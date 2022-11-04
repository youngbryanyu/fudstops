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

//storing old "dining" call in case necessary (this worked when tested)
// router.post("/dining", async (req, res) => { // use async/await to ensure request is fulfilled before writing to DB
//     var d = new Date();
//     var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

//     var todayDay = d.getDay();
//     try { //parse outer xml
//         const response = await fetch(PURDUE_DINING_API_URL_DINING_COURTS);
//         if (!response.ok) {
//             throw new Error(`Error! status: ${response.status}`);
//         }
//         const json = await response.json(); //outer information stored in outer json
//         //debug: console.log(outerJson);
//         //iterate through locations listed in dining url
//         //structure: court -> day -> meal
//         for(var court of json.Location){
//             //if not a court in DINING_COURTS, skip
//             if (!(DINING_COURTS.find(courtname => (courtname === court.Name)))) {
//                 continue
//             }
//             const name = court.Name
//             const formalName = court.FormalName
//             const placeID = String(court.GooglePlaceId)
//             var mealInfo = [] //[{meal name, start time, end time}]
//             //populate mealInfo array
//             for (var day of court.NormalHours[0].Days) {
//                 //only select today's day, disregard other days
//                 if (day.Name !== DAYS[todayDay]) {
//                     continue
//                 }
//                 //for each meal today calculate start and end times, convert to 12-hour format, and add suffix
//                 for (var meal of day.Meals) {
//                     var type = meal.Name
//                     var start = meal.Hours.StartTime
//                     var end = meal.Hours.EndTime
//                     var sh = start.split(":")[0]
//                     var eh = end.split(":")[0]
//                     var sm = start.split(":")[1]
//                     var em = end.split(":")[1]
//                     var startSuffix = sh >= 12 ? " PM" : " AM"
//                     var endSuffix = eh >= 12 ? " PM" : " AM"
//                     var mealstart = ((sh % 12) || 12) + ":" + sm + startSuffix
//                     var mealend = ((eh % 12) || 12) + ":" + em + endSuffix

//                     console.log(mealstart)
//                     console.log(mealend)
//                     var curmealinfo = {
//                         mealType: type,
//                         start: mealstart,
//                         end: mealend,
//                     }
//                     mealInfo.push(curmealinfo)
//                     //type contains final meal type
//                     //mealstart contains this meal's start time, mealend contains end time
//                 }
//             }
//             //create object and push

//             //name contains court name
//             //formalName contains court's formal name
//             //mealInfo contains objects denoting meals start/end times
//             //googleID contains google place API key
//             try {
//                 const diningCourtObj = await DiningCourt.findOne({
//                     name: name
//                 });
//                 if (diningCourtObj) { // if menu item already exists, update it with possibly new information
//                     await DiningCourt.findByIdAndUpdate(diningCourtObj._id, {
//                         name: name,
//                         formalName: formalName,
//                         googleID: placeID,
//                         mealInfo: mealInfo,
//                     });
//                     console.log("Updated dining court - " + name);
//                 } else {// create new MenuItem for current menu item
//                     const newDiningCourt = new DiningCourt({
//                         name: name,
//                         formalName: formalName,
//                         googleID: placeID,
//                         mealInfo: mealInfo,
//                     });

//                     const newcourt = await newDiningCourt.save();
//                     // res.status(201).json(item); //return item in DB response to JSON
//                     console.log("Added dining court - " + name);
//                 }
//             } catch (err) {
//                 console.log("Error occured while parsing and saving dining court information");
//                 console.log(err)
//             }
//         }
//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err);
//     }
//     res.status(201).json("Dining/dining courts data was parsed successfully for " + today);
//     console.log("Dining/dining courts data was parsed successfully for " + today);
// });
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
            console.log(court.FormalName)
            console.log(court.GooglePlaceId)
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

                    const curmealinfo = {
                        mealType: name,
                        start: mealstart,
                        end: mealend,
                    }
                    console.log(curmealinfo)
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
