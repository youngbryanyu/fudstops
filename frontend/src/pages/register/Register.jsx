// JS for register page
import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import logo from "../../components/fudstops_white_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate(); // allows us to navigate to login page after signing up

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const handleSetEmail = () => {
        setEmail(emailRef.current.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // prevent default behavior or else registering won't work when clicked

        /* use onChange for username and password to prevent error on first click on register */
        // setUsername(usernameRef.current.value);
        // setPassword(passwordRef.current.value);

        console.log(email);
        console.log(username);
        console.log(password);
        
        try {
            await axios.post("auth/register", { 
                username: username, 
                email: email, 
                password: password
            });
            navigate("/login"); // go to login page after registering
        } catch (err) {
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
                {!email ? (
                    <div className="input">
                        <input 
                            type="email" 
                            placeholder="email address" 
                            ref={emailRef}
                            // onChange={(e)=>setEmail(e.target.value)}
                        />
                        <button className="registerButton" onClick={handleSetEmail}>Get Started</button>
                    </div>
                ) : (
                    <form className="input">
                        <input 
                            type="username"
                            placeholder="username" 
                            ref={usernameRef} 
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="password" 
                            ref={passwordRef} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button className="registerButton" onClick={handleRegister}>Sign Up</button>
                    </form>
                )}
            </div>
        </div>
    );
}