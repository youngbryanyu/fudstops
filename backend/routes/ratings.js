const router = require("express").Router();
const Rating = require("../models/Rating");
const MenuItem = require("../models/MenuItem");

//send user's rating to DB, if it exists alr then update
//this function requires the req body to contain {username, menuItemID, and rating}
router.post("/", async (req, res) => {
    try {
        const findRating = await Rating.findOne({ //findOne returns null if no matching doc found
            username: req.body.username,
            menuItemID: req.body.menuItemID
        });

        if (findRating) { // first see if there is already a rating in the DB for this user + menu item
            const updatedRating = await Rating.findByIdAndUpdate(findRating._id, {
                rating: req.body.rating
            }, { new: true }); // this will return the modified document after updating the rating

            /* update average rating of menu item */
            const ratings = await Rating.find({
                menuItemID: req.body.menuItemID
            });

            if (!ratings || ratings.length == 0) { /* if item has no ratings, set avg rating to new rating */
                const updatedRatingVal = updatedRating.rating;
                await MenuItem.updateOne({
                    ID: req.body.menuItemID
                }, {
                    avgRating: updatedRatingVal
                });
                res.status(201).json("Rating updated, set avg rating: " + updatedRating);
                return;
            } else {
                const avg = getAverageRating(ratings) /* if item has ratings, calculate avg rating ignoring 0s and update entry */
                await MenuItem.updateOne({
                    ID: req.body.menuItemID
                }, {
                    avgRating: avg
                });
                res.status(201).json("Rating updated, updated avg rating: " + updatedRating);
                return;
            }
        } else { // if not then make a new document in the DB
            const newRating = await new Rating({
                username: req.body.username,
                menuItemID: req.body.menuItemID,
                rating: req.body.rating
            }).save();

            /* update average rating of menu item */
            const ratings = await Rating.find({
                menuItemID: req.body.menuItemID
            });

            if (!ratings || ratings.length === 0) { /* if item has no ratings, set avg rating to new rating */
                const newRatingVal = newRating.rating;
                await MenuItem.updateOne({
                    ID: req.body.menuItemID
                }, {
                    avgRating: newRatingVal
                }, {new: true});

                res.status(201).json("New Rating created, set avg rating: " + newRating);
                return;
            } else {
                const avg = getAverageRating(ratings) /* if item has ratings, calculate avg rating ignoring 0s and update entry */
                await MenuItem.updateOne({
                    ID: req.body.menuItemID
                }, {
                    avgRating: avg
                });
                res.status(201).json("New Rating created, updated avg rating: " + newRating);
                return;
            }
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("Error: " + error);
    }
});

//get a user's rating of a specific menu item
router.get("/:username/:menuItemId", async (req, res) => {
    try {
        //find the doc with the matching username and menuItemId
        const findRating = await Rating.findOne({
            username: req.params.username,
            menuItemID: req.params.menuItemId
        });

        if (!findRating) { // this means a rating doc was not found so create one with rating 0
            const newRating = await new Rating({
                username: req.params.username,
                menuItemID: req.params.menuItemId,
                rating: 0
            }).save();
            res.status(200).json(newRating);
            return;
        }

        res.status(200).json(findRating);

    } catch (error) {

        res.status(500).json("Error: " + error);

    }
});

// get avg rating of a menu item 
router.get("/:menuItemId", async (req, res) => {

    try {
        const menuItem = await MenuItem.findOne({
            ID: req.params.menuItemId
        });
        
        if (!menuItem || menuItem.avgRating === 0) { // menu item doesn't exist, rating is "N/A"
            res.status(200).json({ "avgRating": "N/A" });
            return;
        } else {
            res.status(200).json({ "avgRating": menuItem.avgRating });
        }
    } catch (error) {
        res.status(500).json("Error: " + error);
        console.log("Error: " + error);
    }
});

/* get the average rating of a menu item */
function getAverageRating(ratings) {
    let total = 0;
    let numRatings = 0;

    ratings.forEach(ratingObj => {
        if (ratingObj.rating > 0) { // ratings of 0 don't count
            numRatings++;
        }
        total += ratingObj.rating;
    });

    let avg = total / numRatings;
    return avg.toFixed(1);
}

module.exports = router;