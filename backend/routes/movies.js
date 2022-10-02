// movies.js - API routing for movies
const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken")

// CREATE - create new movie
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) { // only admin can create new movie
        const newMovie = new Movie(req.body); // create schema w/ what's in body request

        try {
            const savedMovie = await newMovie.save(); // save new movie to DB
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to create a movie!");
    }
});

// UPDATE - update movie entry
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) { // only admin can create new movie
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body // update parameters in the body
                }, 
                { new : true } // returned the updated entry
            );
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to update a movie!");
    }
});

// DELETE - delete movie entry
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) { // only admin can delete create new movie

        try {
            await Movie.findByIdAndDelete(req.params.id); // delete movie with matching id
            res.status(200).json("The movie has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to delete a movie!");
    }
});

// GET - get single movie entry
router.get("/find/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // find movie with matching id
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET RANDOM - get random movie entry
router.get("/random", async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } }, // get all entries that are series
                { $sample: { size: 1 }} // get 1 random entry matching the conditions
            ]);
        } else { 
            movie = await Movie.aggregate([
                { $match: { isSeries: false } }, // get all entries that are movies
                { $sample: { size: 1 }} // get 1 random entry matching the conditions
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL - get all movies
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) { // only admin can get all movies
        try {
            const movies = await Movie.find(); // delete movie with matching id
            res.status(200).json(movies.reverse()); // get movies in order newest to oldest
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to get all movies!");
    }
});

module.exports = router;