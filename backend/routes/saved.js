const router = require("express").Router();
const Saved = require("../models/Saved");
const MenuItem = require('../models/MenuItem');

//send user's saved item to DB, if it exists alr then update
//this function requires the req body to contain {username, menuItemID, and saved}
router.post("/", async (req, res) => {
    
    try {

        const findSaved = await Saved.findOne({ //findOne returns null if no matching doc found
            username:   req.body.username,
            menuItemID: req.body.menuItemID
        });

        if(findSaved) { //first see if there is already a rating in the DB for this user + menu item


            const updatedSaved = await Saved.findByIdAndUpdate(findSaved._id, {
                saved: req.body.saved
            }, {new: true}); // this will return the modified document after updating the rating

            res.status(201).json("Saved item updated for: " + updatedSaved);
            return;

        } else {  //if not then make a new document in the DB

            const newSaved = await new Saved({
                username:   req.body.username,
                menuItemID: req.body.menuItemID,
                saved: req.body.saved
            }).save();

            res.status(201).json("New Saved created: " + newSaved);
            return;

        }

    } catch(error) {
        res.status(500).json(error);
        console.log("Error: " + error);
    }

});

//get all of a user's saved items (first gets all user's items, then checks if saved == true)
router.get("/allSaved/:username", async (req, res) => {

    try{

        const response = await Saved.find({username: req.params.username});

        if(response == null) {
            res.status(500).json("No user found");
            return;
        }

        let allUsersSavedItems = [];
        let index = 0;

        response.forEach( async (savedItem) => {

            if(savedItem.saved == true) {

                const item = await MenuItem.findOne( {ID: savedItem.menuItemID} );

                allUsersSavedItems.push(item);

            }

            if(index == response.length - 1) {
                res.status(200).json(allUsersSavedItems);
                return;        
            }

            index += 1;

        });

    } catch(error) {

        res.status(500).json(error);
        console.log(error);

    }

});

//get whether a user saved a specific menu item
router.get("/:username/:menuItemId", async (req, res) => {

    try{

        //find the doc with the matching username and menuItemId
        const findSaved = await Saved.findOne({
            username:   req.params.username,
            menuItemID: req.params.menuItemId
        });

        if(!findSaved) { // this means a rating doc was not found
            const newSaved = await new Saved({
                username:   req.params.username,
                menuItemID: req.params.menuItemId,
                saved: false
            }).save();
            res.status(200).json(newSaved);
            return;
        } 

        res.status(200).json(findSaved);

    } catch(error) {

        res.status(500).json("Error: " + error);

    }

});

module.exports = router;