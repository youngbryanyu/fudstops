// JS for login page
import "./login.scss";
import { login } from "../../authContext/apiCalls";
import logo from "../../components/fudstops_white_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault(); // need this to prevent default behavior or else login won't work
        login({ email, password }, dispatch); // login and store the user in local storage (context)
    }

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
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>
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