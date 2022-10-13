// JS for resetting password
import { useEffect, useState, Fragment } from "react";
import logo from "../../components/fudstops_white_logo.png";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./forgotPasswordReset.scss";
import {MIN_PASSWORD_LENGTH, isValidPasswordFormat} from "../../utils/regexAndStrings";

const INVALID_PASSWORD_ERROR = "The password length must be at least "
const INVALID_TOKEN_ERROR = "This password reset form has expired"

const ForgotPasswordReset = () => {
    const [validUrl, setValidUrl] = useState(true);
    const [password, setPassword] = useState("");
    const [resetSuccessfully, setResetSuccessfully] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(INVALID_PASSWORD_ERROR + " " + MIN_PASSWORD_LENGTH);

    const param = useParams();

    const url = `passwordReset/${param.id}/${param.token}`;

    /**
     * Verifies if the reset password page is valid based on the token
     */
    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(""); // --> get from forgotPasswordReset
                setValidUrl(true);
            } catch (err) {
                setValidUrl(false);
            }
        };
        verifyUrl();
    }, [param, url]);

    /**
     * Handle submitting the reset password form
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsError(false);
            if (!isValidPasswordFormat(password)) {
                setIsError(true);
                return;
            }
            await axios.post("", { password }); // try to reset password --> post to forgotPasswordReset
            setResetSuccessfully(true); // reset succesfully if no error caught
            setIsError(false); // no error if reset successfully
            setErrorMessage(INVALID_TOKEN_ERROR);
        } catch (error) {
            setIsError(true);
        }
    };

    /**
    * Display a 5 second message informing the user their password reset was successful
    */
    useEffect(() => {
        if (resetSuccessfully) {
            setTimeout(() => {
                setResetSuccessfully(false);
            }, 5000);
        }
    }, [resetSuccessfully]);

    return (
        <> {validUrl ? (
            <div className="forgotPasswordReset">
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

                    <div className="recentlyRegisteredMessage">
                        <p style={{ visibility: !resetSuccessfully && "hidden" }}>
                            Your password was reset successfully!
                        </p>
                    </div>

                    <form>
                        <h1>Reset Password</h1>
                        <input type="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="resetButton" onClick={handleSubmit}>Set New Password</button>

                        <div className="errorMessage">
                            <p style={{ visibility: !isError && "hidden" }}>
                                {errorMessage}
                            </p>
                        </div>

                        <Link to="/login" className="link">
                            <button className="backButton">Back to Login</button>
                        </Link>
                    </form>
                </div>
            </div>) : (<h1>404 Not Found</h1>)}
        </>
    );
};

export default ForgotPasswordReset;
