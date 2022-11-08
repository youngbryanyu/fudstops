// Page for reporting a problem
// JS for login page
import "./deleteAccount.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useEffect, useRef, useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { logout } from "../../authContext/apiCalls";


const ERROR_MESSAGE = "Username doesn't match!"

export default function DeleteAccount() {
    const [usernameConfirmation, setUsernameConfirmation] = useState("");
    const [usernameMatches, setUsernameMatches] = useState(true);
    const [submittedForm, setSubmittedForm] = useState(false);

    const navigate = useNavigate();

    const { user } = useContext(AuthContext); // get user from auth context, can directly index into its fields
    const { dispatch } = useContext(AuthContext); // get auth context
    let username = user.username; // store error message with username
    let userId = user._id;

    /**
     * Handles submitting the form
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default behavior

        console.log(user.accessToken)
        if (usernameConfirmation !== username) {
            setUsernameMatches(false);
            return;
        } else {
            setUsernameMatches(true);
            try {
                await axios.delete('users/' + userId + "/" + username, {
                    headers: {
                        token: "Bearer " + user.accessToken // need access token to delete
                    }
                });
                logout(dispatch); // logout (context)
                navigate("/register");
            } catch (error) {
                console.log(error);
            }
        }
    }

    /**
     * Have successfully submitted message disappear after 5 seconds
     */
    useEffect(() => {
        if (submittedForm) {
            setTimeout(() => {
                setSubmittedForm(false);
            }, 5000);
        }
    }, [submittedForm]);

    return (
        <div className="deleteAccount">
            <div className="top">
                <Navbar />
            </div>
            <div className="deleteAccountForm">
                <div className="container">

                    <form>
                        <h1>Confirm Account Deletion</h1>
                        <input
                            type="text"
                            placeholder="Enter username to confirm account deletion"
                            onChange={(e) => setUsernameConfirmation(e.target.value)}
                            className="input"
                        />

                        <div className="errorMessage"> {/* error message if invalid problem message (empty problem message) */}
                            <p className="errorMessage" style={{ visibility: usernameMatches && "hidden" }}> {/*  */}
                                {ERROR_MESSAGE}
                            </p>
                        </div>
                        <button className="loginButton" onClick={handleSubmit}>Delete Account</button>

                        <Link to="/settings" className="link">
                            <button className="backButton">Back</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}