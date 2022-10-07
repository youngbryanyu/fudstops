// JS for login page
import "./login.scss";
import { login } from "../../authContext/apiCalls";
import logo from "../../components/fudstops_white_logo.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useEffect, useRef, useContext, useState } from "react";

const JUST_REGISTERED_MESSAGE = "Your registration was successful!"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidCredentials, setIsValidCredentials] = useState(true);
    const { dispatch } = useContext(AuthContext);
    const [recentlyRegistered, setRecentlyRegistered] = useState(false);


    const { user } = useContext(AuthContext); // get user from auth context

    const handleLogin = (e) => {
        e.preventDefault(); // need this to prevent default behavior or else login won't work
        login({ email, password }, dispatch); // login and store the user in local storage (context)

        if (user == null) {
            setIsValidCredentials(false);
        }
    }

    const location = useLocation(); // get whether user just registered when navigating from register page 
    if (location.state != null) { // null if manually navigated to this page (not after successful register)
        // setRecentlyRegistered(true);
        // console.log(recentlyRegistered);
    }

    /**
     * Get whether user just registered when navigating from register page 
     */
    useEffect(() => {
        if (location.state != null) {
            setRecentlyRegistered(location.state.justRegistered);
        }
    }, [location.state]);

    /**
     * Display a 5 second message informing the user their sign up was successful
     */
    const firstUpdate = useRef(true);
    useEffect(() => {
        if (recentlyRegistered) {
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
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>

                    <div className="errorMessage"> {/* error message if invalid credentials (user == null) */}
                        <p style={{ visibility: isValidCredentials && "hidden" }}>
                            Invalid email or password.
                        </p>
                    </div>

                    <span>
                        New to Füdstops?
                        <b className="signUp">
                            <Link to="/register" className="link"> Sign up now.</Link>
                        </b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b className="learnMore">Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
}