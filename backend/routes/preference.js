const router = require("express").Router();
const Preference = require("../models/Preference");

// send preferences to database, if they already exist then update
router.post("/", async (req, res) => {
    try {
        // if entry for user already exists, update existing entry instead of creating new entry
        const preferences = await Preference.findOne({
            username: req.body.username
        });
        if (preferences) {
            const updatedPreferences = await Preference.findByIdAndUpdate(preferences._id, {
                preferences: req.body.preferences
            }, { new: true });
            res.status(201).json("Preferences were updated." + updatedPreferences);
            return;
        } else {
            // save preferences to database
            const newPreferences = await new Preference({
                username: req.body.username,
                preferences: req.body.preferences
            }).save();

            res.status(201).json("New preferences were saved: " + newPreferences);
            return;
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("error writing preferences: " + error);
    }
});

// get preferences from database
router.get("/:username", async (req, res) => {
    try {
        const preferences = await Preference.findOne({
            username: req.params.username
        });

        if (!preferences) {
            res.status(500).json("Error retrieving preferences (user likely doesn't have any yet)");
            // console.log("Error retrieving preferences (username likely doesn't exist)");
            return;
        }

        res.status(200).json(preferences); // return preferences
        console.log("Successfully retrieved preferences: " + preferences);
    } catch (error) {
        res.status(500).json("Error retriving preferences (user likely doesn't have any yet):" + error);
        // console.log("Error retrieving preferences: " + error);
    }
});

// delete preferences from database
router.delete("/", async (req, res) => {
    try {
        await Preference.deleteOne({
            username: req.body.username
        });

        res.status(200).json("Successfully deleted preferences for user: " + req.body.username); 
        // console.log("Successfully deleted preferences for user: " + req.body.username);
    } catch (error) {
        res.status(500).json("Error deleting preferences (user likely doesn't have any yet): " + error);
        // console.log("Error retrieving preferences: " + error);
    }
});

module.exports = router;