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
            res.status(201).json("Preferences were updated: " + updatedPreferences);
            return;
        } else {
            // save preferences to database
            const newPreferences = new Preference({
                username: req.body.username,
                preferences: req.body.preferences
            }, {
                new: true
            });
            await newPreferences.save();

            res.status(201).json("New preferences were saved: " + newPreferences);
            return;
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("error writing preferences: " + error);
    }
});

// TODO create GET call to get menu items

module.exports = router;