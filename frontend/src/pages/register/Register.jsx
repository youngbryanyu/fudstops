// JS for register page
import { useState } from "react";
import "./register.scss";
import logo from "../../components/fudstops_white_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VALID_EMAIL_REGEX = /.+@.+\.[A-Za-z]+$/;
const EXISTING_CREDENTIALS_ERROR = "Email or username already taken."
const INVALID_EMAIL_ERROR = "Invalid email address format. Email must be of form example@email.com"
const INVALID_USERNAME_ERROR = "Invalid username. The minimum length must be at least "
const INVALID_PASSWORD_ERROR = "Invalid password. The minimum length must be at least "
const MIN_PASSWORD_LENGTH = 5;
const MIN_USERNAME_LENGTH = 1;

/**
 *  Returns whether email address is in a valid format 
 */
function isValidEmailFormat(email) {
    return VALID_EMAIL_REGEX.test(email);
}

/**
 *  Returns whether username is valid
 */
function isValidUsernameFormat(username) {
    return username.length >= MIN_USERNAME_LENGTH;
}

/**
 *  Returns whether password is valid
 */
function isValidPasswordFormat(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
}

export default function Register() {
    const navigate = useNavigate(); // allows us to navigate to login page after signing up

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [isValidNewUser, setIsValidNewUser] = useState(true); // if credentials not already taken
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [clickedGetStarted, setclickedGetStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(EXISTING_CREDENTIALS_ERROR);

    /**
     * Handles when user clicks 'Get Started' key after typing email
     */
    const handleSetEmailClick = (e) => {
        setclickedGetStarted(true);  // only validate email when user tries to submit form at end
    };

    /**
     * Handles when user hits 'Enter' key after typing email
     */
    const handleSetEmailEnter = (e) => {
        if (e.key === 'Enter') {
            setclickedGetStarted(true); // only validate email when user tries to submit form at end
        }
    };

    /**
     * Handles registration when user clicks "sign up"
     */
    const handleRegister = async (e) => {
        e.preventDefault(); // prevent default behavior or else registering won't work when clicked

        // reset all error messages at start of event
        setIsValidEmail(true);
        setIsValidNewUser(true);
        setIsValidUsername(true);
        setIsValidPassword(true);

        /* use onChange instead of useRef and useState to prevent error on first click on register */

        if (!isValidEmailFormat(email)) {
            setIsValidEmail(false);
            setErrorMessage(INVALID_EMAIL_ERROR);
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

        try {
            await axios.post("auth/register", {
                username: username,
                email: email,
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
    };

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
                    Ready to eat good? Enter your email to create your account.
                </p>

                <div className="input">
                    <input
                        type="email" // TODO: make this email or phone number
                        placeholder="email address"
                        onChange={(e) => {
                            setEmail(
                                e.target.value
                            )
                        }}
                        // onKeyDown={(clickedGetStarted) ? handleRegister : handleSetEmailEnter} // if all forms are shown, hitting enter while cursor is on email should submit form --> TODO: need to fix this, email box freezes after clicking enter
                        onKeyDown={handleSetEmailEnter}

                    />
                    {!clickedGetStarted && ( // hide this button when user clicks on next
                        <button
                            className="registerButton"
                            onClick={handleSetEmailClick}
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
                        <p style={{ visibility: (isValidEmail && isValidNewUser && isValidUsername && isValidPassword) && "hidden" }}>
                            {errorMessage}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}