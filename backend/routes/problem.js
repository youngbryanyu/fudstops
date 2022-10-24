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

module.exports = router;