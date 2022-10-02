// lists.js - API routing for lists
const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken")

// CREATE - create new list
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) { // only admin can create new list
        const newList = new List(req.body); // create schema w/ what's in body request

        try {
            const savedList = await newList.save(); // save new list to DB
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to create a list!");
    }
});

// DELETE - delete list
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) { // only admin can delete a list
        try {
            await List.findByIdAndDelete(req.params.id); // delete list from DB
            res.status(201).json("The list has been deleted");
        } catch (err) {
            res.status(500).json("");
        }
    } else {
        res.status(403).json("You are not allowed to create a list!");
    }
});

// GET - get list
router.get("/", async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) { // if type query exists (user clicked on series or movies tab)
            if (genreQuery) { // if genre is specified
                list = await List.aggregate([
                    { $sample: { size: 10} }, // get list of size 10
                    { $match: { type: typeQuery, genre: genreQuery } } // get lists that match type and genre
                ])
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10} }, // get list of size 10
                    { $match: { type: typeQuery } } // get lists that match type
                ])
            }
        } else { // else on home page, get random lists
             list = await List.aggregate([{ $sample: {size: 10} }]); // get list of size 10
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;