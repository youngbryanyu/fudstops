// Register.jsx - javascript for register page
import { useRef } from "react"
import { useState } from "react"
import "./register.scss"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef(); // reference to email input box
    const passwordRef = useRef(); // reference to password input box

    const handleStart = () => { // when user clickers get started button, set email
        setEmail(emailRef.current.value);
    };

    const handleFinish = () => { // when user clicks register, set password
        setPassword(passwordRef.current.value);
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img 
                    className="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
                    alt="" 
                />
                <button className="loginButton">Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {
                    !email ? ( // if user didn't input and hit "get started" email
                        <div className="input">
                            <input type="email" placeholder="gan@ganklan.org" ref={emailRef}/>
                            <button className="registerButton" onClick={handleStart}>
                                Get Started
                            </button>
                        </div>
                    ) : ( // if user did, take them to password form 
                        <form className="input">
                            <input type="password" placeholder="password" ref={passwordRef}/>
                            <button className="registerButton" onClick={handleFinish}>
                                Register
                            </button>
                        </form>
                    )
                }    
            </div>
        </div>
    )
}
  