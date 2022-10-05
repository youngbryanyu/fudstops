// JS for register page
import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import logo from "../../components/fudstops_white_logo.png";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value);
    };
    const handleFinish = () => {
        setPassword(passwordRef.current.value);
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
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder="email address" ref={emailRef} />
                        <button className="registerButton" onClick={handleStart}>Get Started</button>
                    </div>
                ) : (
                    <form className="input">
                        <input type="password" placeholder="password" ref={passwordRef} />
                        <button className="registerButton" onClick={handleFinish}>Sign Up</button>
                    </form>
                )}
            </div>
        </div>
    );
}