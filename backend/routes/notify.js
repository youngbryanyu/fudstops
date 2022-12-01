// API routing for menu notifications
const router = require("express").Router();
const Notify = require("../models/Notify");
const sendText = require("../utils/sendItemsText");

//post the users notifications selections to the db
router.post("/update", async (req, res) => {

    try {

        const findUser = await Notify.findOne({ //findOne returns null if no matching doc found
            username: req.body.username
        });

        if (findUser) { //first see if there is already this user in the DB

            const updatedUser = await Notify.findByIdAndUpdate(findUser._id, {
                optInRated: req.body.optInRated,
                optInSaved: req.body.optInSaved
            }, { new: true }); // this will return the modified document after updating the rating

            res.status(201).json("User updated for: " + updatedUser);
            return;

        } else {  //if not then make a new document in the DB

            const newUser = await new Notify({
                username: req.body.username,
                optInRated: req.body.optInRated,
                optInSaved: req.body.optInSaved
            }).save();

            res.status(201).json("New User created: " + newUser);
            return;

        }

    } catch (error) {
        res.status(500).json(error);
        console.log("Error: " + error);
    }

});

//get the user from DB and return that user's notification selections
router.get("/user/:username", async (req, res) => {

    try {

        //find the doc with the matching username and menuItemId
        const findUser = await Notify.findOne({
            username: req.params.username
        });

        if (!findUser) { // this means a rating doc was not found
            const newUser = await new Notify({
                username: req.params.username,
                optInRated: false,
                optInSaved: false
            }).save();
            res.status(200).json(newUser);
            return;
        }

        res.status(200).json(findUser);

    } catch (error) {

        res.status(500).json("Error: " + error);

    }

});

//make endpoints for texting user that the items are being served in the dining court
router.post("/text", async (req, res) => {

    try {

        //write query that finds all items user rated 4+ stars
        //then check if those items are being served today
        //add matches to the list of items to be sent in text

        await sendText(req.body.phoneNum, req.body.text);

        res.status(200).send("Items texted to user successfully!");

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

});

module.exports = router;