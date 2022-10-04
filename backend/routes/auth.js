// auth.js - API routing for authentication
const router = require("express").Router(); // post=create, put=update, get=fetch data
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER - create new user
router.post("/register", async (req, res) => { // use async/await to ensure request is fulfilled before writing to DB
    const newUser = new User({
        username: req.body.username, // body of POST request
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString() // encrypt password using AES
    });

    try {
        const user = await newUser.save(); // save new user in database
        res.status(201).json(user); // return user in DB response in JSON
    } catch (err) {
        res.status(500).json(err); // 500: server error
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne( { email: req.body.email } ); // try to find one user matching the email from DB
        if (!user) {
            res.status(401).json("Wrong username or password!"); // if no matching email in DB
            return;
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY); // decrypt user's password from DB
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) { 
            res.status(401).json("Wrong username or password!!"); // if incorrect password
            return;
        }

        const accessToken = jwt.sign( // access token which prevents others from using your userID and etc, verify requests using JSON web token instead of body of request, hide user id and admin flag in JWT token
            {id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY, 
            {expiresIn: "5d"} // expires in 5d, need to login again
        ); 

        const {password, ...info} = user._doc; // split password from user data --> return everything but password in JSON response

        res.status(200).json({...info, accessToken}); // return user from DB response in JSON
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 