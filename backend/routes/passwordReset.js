// API routing for forgot password reset
const router = require("express").Router();
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const ResetPasswordToken = require("../models/ResetPasswordToken");

// send reset password link
router.post("/", async (req, res) => {
    try {
        // validate if user with email exists
        const user = await User.findOne({ email: req.body.emailOrPhoneOrUsername });
        if (!user) {
            return res.status(409).send({ message: "User with the given email does not exist." });
        }

        // create reset password token for user
        let token = await ResetPasswordToken.findOne({ userId: user._id });
        if (!token) { // create new token if existing doesn't exist
            token = await new ResetPasswordToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
        }

        // send password reset url to user's email
        const url = `${process.env.BASE_URL}forgotPasswordReset/${user._id}/${token.token}/`;
        await sendEmail(user.email, "Password Reset - Füdstops", url);

        // send url to email
        res.status(200).send({ message: "password reset link sent to your email: " + user.email });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// verify token and user in password reset url 
router.get("/:id/:token", async (req, res) => {
    try {
        // validate that user exists
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).send({ message: "Invalid link" });
        }

        // validate token exists and is linked to the user
        const token = await ResetPasswordToken.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) { // invalid token
            return res.status(400).send({ message: "Invalid link" });
        }

        res.status(200).send("Valid Url");
    } catch (error) {
        res.status(500).send(err);
    }
});

// reset password
router.post("/:id/:token", async (req, res) => {
    try {
        // find user to reset password
        const user = await User.findOne({ _id: req.params.id }); // find user to reset
        if (!user) {
            return res.status(400).send({ message: "Invalid link" });
        }

        // validate token for resetting password
        const token = await ResetPasswordToken.findOne({ // find user's token for password reset
            userId: user._id,
            token: req.params.token,
        });
        if (!token) { // invalid token
            return res.status(400).send({ message: "Invalid link" });
        }

        // encrypte and update user's password
        const newPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        await await User.findByIdAndUpdate(
            req.params.id,
            { password: newPassword },
            { new: true } // makes sure the updated user is returned in the JSON
        );
        await ResetPasswordToken.findByIdAndDelete(token._id); // delete token after password is changed. // TODO: delete after testing 

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;