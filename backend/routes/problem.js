const router = require("express").Router();
const Problem = require("../models/Problem");

// send problem to database
router.post("/", async (req, res) => {
    try {
        // TODO: replace this
        // save problem to database
        const problem = await new Problem({
            username: req.body.username,
            problem: req.body.problem
        }).save();

        res.status(201).json("Problem message successfully sent to DB: " + req.body.problem);
    } catch (error) {
        res.status(500).json(error);
        console.log("error sending problem message to DB restrictions: " + error);
    }
});

// get all user's problem message from database
router.get("/:username", async (req, res) => {
    try {
        const problems = await Problem.find({
            username: req.params.username
        });

        if (problems.length === 0) {
            res.status(500).json("Error retrieving restrictions (user likely doesn't have any yet)");
            // console.log("Error retrieving restrictions (username likely doesn't exist)");
            return;
        }

        res.status(200).json(problems); // return problems
        // console.log("Successfully retrieved problemss: " + problemss);
    } catch (error) {
        res.status(500).json("Error retriving problemss (user likely doesn't have any yet):" + error);
        // console.log("Error retrieving problems: " + error);
    }
});

// delete all problems from a user from database
router.delete("/", async (req, res) => {
    try {
        await Problem.remove({
            username: req.body.username
        });

        res.status(200).json("Successfully deleted problems submitted for user: " + req.body.username);
        // console.log("Successfully deleted restrictions for user: " + req.body.username);
    } catch (error) {
        res.status(500).json("Error deleting problems for user: " + error);
        // console.log("Error retrieving restrictions: " + error);
    }
});

module.exports = router;