// JS for login page
import "./login.scss";
import { login } from "../../authContext/apiCalls";
import logo from "../../components/fudstops_white_logo.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useEffect, useRef, useContext, useState } from "react";
import { isValidPhoneFormat, stripNonDigits, EMPTY_EMAIL_STRING, EMPTY_PHONE_STRING } from "../../utils/regexAndStrings";

const JUST_REGISTERED_MESSAGE = "Your registration was successful!"

export default function Login() {
    const [emailOrPhoneOrUsername, setEmailOrPhoneOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidCredentials, setIsValidCredentials] = useState(true);
    const { dispatch } = useContext(AuthContext);
    const [recentlyRegistered, setRecentlyRegistered] = useState(false);

    const [user, setUser] = useState({}); // begin with {} instead of null b/c useEffect detects changes to null as well

    /**
     * Handles logging in the user when they click sign in
     */
    const handleLogin = (e) => {
        e.preventDefault(); // prevent default behavior

        // handle edge when user tries to login with empty phone string or empty email string
        if (emailOrPhoneOrUsername.includes(EMPTY_EMAIL_STRING) || emailOrPhoneOrUsername.includes(EMPTY_PHONE_STRING)) {
            setUser(null);
            return;
        }

        // strip non-digits if user is trying to login with phone number
        const loginMethod = isValidPhoneFormat(emailOrPhoneOrUsername) ? stripNonDigits(emailOrPhoneOrUsername) : emailOrPhoneOrUsername;
        login({ loginMethod, password }, dispatch).then( // login and store the user in local storage (context)
            returnedUser => setUser(returnedUser) // get user from login
        ); // note: the useState here is causing a warning
    }

    /**
    * After log in attempt, set flag for whether or not it was a successful attempt (to determine whether to display error message)
    */
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (user == null) {
            setIsValidCredentials(false);
        }
    }, [user]);

    const location = useLocation(); // get whether user just registered when navigating from register page 

    /**
     * Get whether user just registered (navigated from register page) 
     */
    useEffect(() => {
        if (location.state != null) {
            setRecentlyRegistered(location.state.justRegistered);
        }
    }, [location.state]);

    /**
     * Display a 5 second message informing the user their sign up was successful
     */
    useEffect(() => {
        if (recentlyRegistered) {
            window.history.replaceState({}, document.title, null); // prevents message from showing up after page reload
            setTimeout(() => {
                setRecentlyRegistered(false);
            }, 5000);
        }
    }, [recentlyRegistered]);

    return (
        <div className="login">
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
                    <p style={{ visibility: !recentlyRegistered && "hidden" }}>
                        {JUST_REGISTERED_MESSAGE}
                    </p>
                </div>

                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Phone number, username, or email" onChange={(e) => setEmailOrPhoneOrUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>

                    <div className="errorMessage"> {/* error message if invalid credentials (user == null) */}
                        <p style={{ visibility: isValidCredentials && "hidden" }}>
                            Invalid login credentials.
                        </p>
                    </div>

                    <span>
                        New to Füdstops?
                        <b className="signUp">
                            <Link to="/register" className="link"> Sign up now.</Link>
                        </b>
                    </span>
                    <small>
                        <b className="forgotYourPassword"> <Link to="/forgotPassword" className="link">Forgot your password?</Link> </b>
                    </small>
                    {/* <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b className="learnMore">Learn more</b>.
                    </small> */}
                </form>
            </div>
        </div>
    );
}