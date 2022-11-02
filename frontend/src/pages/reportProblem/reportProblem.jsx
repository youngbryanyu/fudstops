// Page for reporting a problem
// JS for login page
import "./reportProblem.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useEffect, useRef, useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const SUBMIT_MESSAGE = "The problem was reported successfully!";
const ERROR_MESSAGE = "Cannot submit an empty problem message!"

function isValidErrorMessageChecker(errorMessage) {
    return errorMessage.length > 0;
}

export default function ReportProblem() {
    const [problemMessage, setProblemMesssage] = useState("");
    const [isValidProblemMessage, setIsValidProblemMessage] = useState(true);
    const [submittedForm, setSubmittedForm] = useState(false);

    const { user } = useContext(AuthContext); // get user from auth context, can directly index into its fields
    const errRef = useRef();
    let username = user.username; // store error message with username

    /**
     * Handles submitting the form
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default behavior

        if (!isValidErrorMessageChecker(problemMessage)) {
            setIsValidProblemMessage(false);
            return;
        } else {
            setIsValidProblemMessage(true);
            try {
                await axios.post('problem', {
                    username: username,
                    problem: problemMessage
                });
                setSubmittedForm(true);
                errRef.current.value = ''; // set text box to empty
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
        <div className="reportProblem">
            <div className="top">
                <Navbar />
            </div>
            <div className="reportProblemForm">
                <div className="container">
                    <div className="recentlyRegisteredMessage"> {/* recently submitted form message */}
                        <p style={{ visibility: !submittedForm && "hidden" }}>
                            {SUBMIT_MESSAGE}
                        </p>
                    </div>

                    <form>
                        <h1>Report a Problem</h1>
                        <textarea
                            maxlength="400"
                            placeholder="Type the problem here (400 characters max)..."
                            onChange={(e) => setProblemMesssage(e.target.value)}
                            ref={errRef}
                        />
                        <div className="errorMessage"> {/* error message if invalid problem message (empty problem message) */}
                            <p className="errorMessage" style={{ visibility: isValidProblemMessage && "hidden" }}>
                                {ERROR_MESSAGE}
                            </p>
                        </div>
                        <button className="loginButton" onClick={handleSubmit}>Submit</button>


                        <Link to="/settings" className="link">
                            <button className="backButton">Back</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}