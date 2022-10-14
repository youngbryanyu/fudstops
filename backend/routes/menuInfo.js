//const router = require("express").Router();
const cheerio = require("cheerio")
const afterLoad  = require("after-load")
const parser = require('xml2json')
const fetch = require('node-fetch')

var d = new Date();
var today = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "/"
const url = "https://dining.purdue.edu/menus/Wiley/" + today

// router.post("/register", async (req, res) => { // use async/await to ensure request is fulfilled before writing to DB
async function scrape() {
    try {
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
        //iterate through keys, slice url and append key, parse xml to json
        for(const key of itemKeys) {
            const parseUrl = "https://api.hfs.purdue.edu/menus/v2/items/" + key.slice(12)
            // console.log(parseUrl)
            const response = await fetch(parseUrl)
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`)
            }


            const json = await response.json()
            console.log("Name: ", json.Name)
            console.log("Nutrition: ", json.Nutrition)
        }
    } catch (err) {
        // res.status(500).json(err);
        console.log(err);
    }
}
scrape()