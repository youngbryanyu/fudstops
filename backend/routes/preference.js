const router = require("express").Router();
const Preference = require("../models/Preference");

// send preferences to database, if they already exist then update
router.post("/", async (req, res) => {
    try {
        // if entry for user already exists, update existing entry instead of creating new entry
        const preferences = await Preference.findOne({
            username: req.body.username
        });
        console.log(preferences);
        if (preferences) {
            const updatedPreferences = await Preference.findByIdAndUpdate(preferences._id, {
                preferences: req.body.preferences
            });
            res.status(201).json("Preferences were updated.");
            return;
        } else {
            // save preferences to database
            const newPreferences = new Preference({
                username: req.body.username,
                preferences: req.body.preferences
            }, { new: true });
            await newPreferences.save();

            res.status(201).json("New preferences were saved: " + newPreferences);
            return;
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("error writing preferences: " + error);
    }
});

// get preferences from database
router.get("/", async (req, res) => {
    try {
        const preferences = await Preference.findOne({
            username: req.body.username
        });

        if (!preferences) {
            res.status(500).json("Error retrieving preferences (username likely doesn't exist)");
            console.log("Error retrieving preferences (username likely doesn't exist)");
            return;
        }

        res.status(200).json("Successfuly retrieved preferences: " + preferences);
        console.log("Successfuly retrieved preferences: " + preferences);

        return preferences;
    } catch (error) {
        res.status(500).json(error);
        console.log("Error retrieving preferences: " + error);
    }
});

module.exports = router;