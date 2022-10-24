const router = require("express").Router();
const Restriction = require("../models/Restriction");

// send restrictions to database, if they already exist then update
router.post("/", async (req, res) => {
    try {
        // if entry for user already exists, update existing entry instead of creating new entry
        const restrictions = await Restriction.findOne({
            username: req.body.username
        });
        if (restrictions) {
            const updatedRestrictions = await Restriction.findByIdAndUpdate(restrictions._id, {
                restrictions: req.body.restrictions
            }, { new: true });
            res.status(201).json("Restrictions were updated." + updatedRestrictions);
            return;
        } else {
            // save restrictions to database
            const newRestrictions = await new Restriction({
                username: req.body.username,
                restrictions: req.body.restrictions
            }).save();

            res.status(201).json("New restrictions were saved: " + newRestrictions);
            return;
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("error writing restrictions: " + error);
    }
});

// get restrictions from database
router.get("/:username", async (req, res) => {
    try {
        const restrictions = await Restriction.findOne({
            username: req.params.username
        });

        if (!restrictions) {
            res.status(500).json("Error retrieving restrictions (user likely doesn't have any yet)");
            // console.log("Error retrieving restrictions (username likely doesn't exist)");
            return;
        }

        res.status(200).json(restrictions); // return restrictions
        // console.log("Successfully retrieved restrictions: " + restrictions);
    } catch (error) {
        res.status(500).json("Error retriving restrictions (user likely doesn't have any yet):" + error);
        // console.log("Error retrieving restrictions: " + error);
    }
});

// delete restrictions from database
router.delete("/", async (req, res) => {
    try {
        await Restriction.deleteOne({
            username: req.body.username
        });

        res.status(200).json("Successfully deleted restrictions for user: " + req.body.username); 
        // console.log("Successfully deleted restrictions for user: " + req.body.username);
    } catch (error) {
        res.status(500).json("Error deleting restrictions (user likely doesn't have any yet): " + error);
        // console.log("Error retrieving restrictions: " + error);
    }
});

module.exports = router;