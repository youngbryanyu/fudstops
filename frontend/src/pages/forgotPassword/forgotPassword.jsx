// JS for login page
import "./forgotPassword.scss";
import logo from "../../components/fudstops_white_logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EMPTY_PHONE_STRING = " has no phone." // empty phone number contains this
const EMPTY_EMAIL_STRING = " has no email." // empty email contains this

const SENT_RESET_LINK_STRING = "Reset link was sent successfully!";

// Francis Gagnon: from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
const VALID_PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

/**
 * Returns whether input is a valid phone number format
 */
function isValidPhoneFormat(input) {
    return VALID_PHONE_REGEX.test(input);
}

/**
 * Strips a phone number string of the non digit characters
 */
function stripNonDigits(phoneNumber) {
    return phoneNumber.replace(/\D/g, '');
}

// TODO: 
// --> if any user in DB contains email/phone then send text/email
// --> create two APIs: reset by password and reset by email, make check in frontend to determine which one to call (look at Register.jsx)

export default function ForgotPassword() {
    const [emailOrPhoneOrUsername, setEmailOrPhoneOrUsername] = useState("");
    const [isValidCredentials, setIsValidCredentials] = useState(true);
    const [resetLinkSentSuccessfully, setResetLinkSentSuccessfully] = useState(false);

    /**
     * Handles logging in the user when they click sign in
     */
    const handleReset = async (e) => {
        e.preventDefault(); // prevent default behavior
        try {
            setIsValidCredentials(true);
            await axios.post("forgotPasswordReset", { emailOrPhoneOrUsername });
            setResetLinkSentSuccessfully(true);
        } catch (err) {
            // console.log(err);
            setIsValidCredentials(false);
        }
    }

    /**
     * Display a 5 second message informing the user their rest link was sent successfully
     */
    useEffect(() => {
        if (resetLinkSentSuccessfully) {
            setTimeout(() => {
                setResetLinkSentSuccessfully(false);
            }, 5000);
        }
    }, [resetLinkSentSuccessfully]);

    return (
        <div className="forgotPassword">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src={logo}
                        alt=""
                    />
                </div>
            </div>

            <div className="container">

                <div className="recentlyRegisteredMessage"> {/* error message if invalid credentials (user == null) */}
                    <p style={{ visibility: !resetLinkSentSuccessfully && "hidden" }}>{SENT_RESET_LINK_STRING}</p>
                </div>

                <form>
                    <h1>Forgot Password?</h1>
                    <input type="email" placeholder="Email" onChange={(e) => setEmailOrPhoneOrUsername(e.target.value)} />
                    <button className="resetButton" onClick={handleReset}>Send Reset Link</button>

                    <div className="errorMessage"> {/* error message if invalid credentials (user == null) */}
                        <p style={{ visibility: isValidCredentials && "hidden" }} >
                            Phone number, username, or email not found
                        </p>
                    </div>

                    <Link to="/login" className="link">
                        <button className="backButton">Back</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}