// JS for forgot password page
import "./forgotPassword.scss";
import logo from "../../components/fudstops_white_logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SENT_RESET_LINK_STRING = "Reset link was sent successfully to your email and/or phone number!";

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
                    <input type="email" placeholder="Phone number, username, or email" onChange={(e) => setEmailOrPhoneOrUsername(e.target.value)} />
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