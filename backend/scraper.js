// const axios = require("axios")
const cheerio = require("cheerio")
// const pretty = require("pretty")
const afterLoad  = require("after-load");

const url = "https://dining.purdue.edu/menus/Wiley/2022/10/8/"


//#main > div.meal > div:nth-child(2) > div > div.station-items > div:nth-child(1) > a
async function scrape() {
    try {
        // fetch html of url with axios
        //const response = await axios.get(url)
        //const body = await response.text()
        const html = afterLoad(url)
        //load in html from axios to cheerio
        const $ = cheerio.load(html)
		//select all the menu items following the selector we use (divs in menu item container)
        const urls = []
        //iterate through all menu items and print them
        $('.station-item').each(function() {
            var item = $(this).attr('href')
            urls.push(item)
        });
        console.log("Printing all menu item HREFs:")
        console.dir(urls)
        //pass each url to parser to parse items and send json to mongodb 
    } catch (err) {
        console.log(err)
    }
}
scrape()
