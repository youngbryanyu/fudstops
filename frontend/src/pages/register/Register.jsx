// JS for register page
import { useState } from "react";
import "./register.scss";
import logo from "../../components/fudstops_white_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect } from "react";

const VALID_EMAIL_REGEX = /.+@.+\.[A-Za-z]+$/;

// Francis Gagnon: from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
const VALID_PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const EXISTING_CREDENTIALS_ERROR = "Email, phone number, or username already taken."
const INVALID_EMAIL_OR_PHONE_ERROR = "Invalid email or phone number format."
const INVALID_USERNAME_ERROR = "Invalid username. Username cannot contain spaces and minimum length must be at least "
const INVALID_PASSWORD_ERROR = "Invalid password. The length must be at least "
const MIN_PASSWORD_LENGTH = 5;
const MIN_USERNAME_LENGTH = 1;

const EMPTY_PHONE_STRING = " has no phone." // empty phone number contains this
const EMPTY_EMAIL_STRING = " has no email." // empty email contains this

/**
 *  Returns whether email address is in a valid format 
 */
function isValidEmailFormat(input) {
    return VALID_EMAIL_REGEX.test(input);
}

/**
 * Returns whether input is a valid phone number format
 */
function isValidPhoneFormat(input) {
    return VALID_PHONE_REGEX.test(input);
}

/**
 *  Returns whether input is in a valid email or phone number 
 */
function isValidEmailOrPhoneFormat(input) {
    return isValidEmailFormat(input) || isValidPhoneFormat(input);
}

/**
 *  Returns whether username is valid --> length >= 5 and no spaces
 */
function isValidUsernameFormat(username) {
    return (username.length >= MIN_USERNAME_LENGTH && !username.includes(" "));
}

/**
 *  Returns whether password is valid
 */
function isValidPasswordFormat(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
}

/**
 * Strips a phone number string of the non digit characters
 */
function stripNonDigits(phoneNumber) {
    return phoneNumber.replace(/\D/g, '');
}

export default function Register() {
    const navigate = useNavigate(); // allows us to navigate to login page after signing up

    const [emailOrPhone, setEmailOrPhone] = useState(""); // user input for email/phone
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [isValidNewUser, setIsValidNewUser] = useState(true); // if credentials not already taken
    const [isValidEmailOrPhone, setIsValidEmailOrPhone] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [clickedGetStarted, setclickedGetStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(EXISTING_CREDENTIALS_ERROR);

    const emailOrPhoneRef = useRef();

    /**
     * Handles when user clicks 'Get Started' key after typing email
     */
    const handleGetStartedClick = (e) => {
        if (emailOrPhoneRef.current.value.length > 0) {
            setclickedGetStarted(true);  // only validate email when user tries to submit form at end
        }
    };

    /**
     * Handles when user hits 'Enter' key after typing email
     */
    const handleGetStartedEnter = (e) => {
        if (e.key === 'Enter') {
            if (emailOrPhoneRef.current.value.length > 0) {
                setclickedGetStarted(true); // only validate email when user tries to submit form at end
            }
        }
    };

    /**
     * Handles registration when user clicks "sign up"
     */
    const handleRegister = (e) => {
        e.preventDefault(); // prevent default behavior or else registering won't work when clicked

        // reset all error messages at start of event
        setIsValidEmailOrPhone(true);
        setIsValidNewUser(true);
        setIsValidUsername(true);
        setIsValidPassword(true);

        /* use onChange instead of useRef and useState to prevent error on first click on register */

        if (!isValidEmailOrPhoneFormat(emailOrPhone)) {
            setIsValidEmailOrPhone(false);
            setErrorMessage(INVALID_EMAIL_OR_PHONE_ERROR);
            return;
        }

        if (!isValidUsernameFormat(username)) {
            setIsValidUsername(false);
            setErrorMessage(INVALID_USERNAME_ERROR + MIN_USERNAME_LENGTH + ".");
            return;
        }

        if (!isValidPasswordFormat(password)) {
            setIsValidPassword(false);
            setErrorMessage(INVALID_PASSWORD_ERROR + MIN_PASSWORD_LENGTH + ".");
            return;
        }

        if (isValidEmailFormat(emailOrPhone)) {
            setEmail(emailOrPhone);
            setPhone(username + EMPTY_PHONE_STRING); // to indicate empty phone
        } else if (isValidPhoneFormat(emailOrPhone)) {
            setPhone(stripNonDigits(emailOrPhone)); // strip non digits when
            setEmail(username + EMPTY_EMAIL_STRING)
        }
    };

    /**
     * Try to register when email and phone are set
     */
    const isFirstRender = useRef(true); // don't do anything on first render
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const handleLogin = async () => {
            try {
                await axios.post("auth/register", {
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                });
                navigate("/login", {
                    state: {
                        justRegistered: true
                    }
                }); // go to login page after registering
            } catch (err) {
                setIsValidNewUser(false); // invalid new user on register
                setErrorMessage(EXISTING_CREDENTIALS_ERROR);
                console.log(err);
            }
        }
        handleLogin();
    }, [email, phone]);

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src={logo}
                        alt=""
                    />
                    <Link to="/login" className="link">
                        <button className="loginButton">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Find all your favorite foods at Purdue.</h1>
                <h2>Sign up for free.</h2>
                <p>
                    Ready to eat good? Enter your phone number or email to create your account.
                </p>

                <div className="input">
                    <input
                        type="email"
                        placeholder="Phone number or email"
                        onChange={(e) => {
                            setEmailOrPhone(
                                e.target.value
                            )
                        }}
                        ref={emailOrPhoneRef}
                        // onKeyDown={(clickedGetStarted) ? handleRegister : handleSetEmailEnter} // if all forms are shown, hitting enter while cursor is on email should submit form --> NIT: need to fix this, email box freezes after clicking enter
                        onKeyDown={handleGetStartedEnter}
                    />
                    {!clickedGetStarted && ( // hide this button when user clicks on next
                        <button
                            className="registerButton"
                            onClick={handleGetStartedClick}
                        >Get Started</button>
                    )}
                </div>

                { // only display username and password forms when user clicks next after entering valid email
                    <form
                        className="input"
                        style={{ visibility: !clickedGetStarted && "hidden" }}
                    >
                        <input
                            type="username"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="registerButton" onClick={handleRegister}>Sign Up</button>
                    </form>
                }

                { // error message if user enters invalid email regex or credentials already taken
                    <div className="errorMessage">
                        <p style={{ visibility: (isValidEmailOrPhone && isValidNewUser && isValidUsername && isValidPassword) && "hidden" }}>
                            {errorMessage}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}