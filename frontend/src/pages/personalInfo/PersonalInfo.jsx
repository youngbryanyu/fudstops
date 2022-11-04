//personal info
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./personalInfo.scss";
import axios from 'axios';
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
    isValidEmailFormat, isValidPhoneFormat, isValidEmailOrPhoneFormat, isValidUsernameFormat,
    isValidPasswordFormat, stripNonDigits,
    MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH, EMPTY_EMAIL_STRING, EMPTY_PHONE_STRING
} from "../../utils/regexAndStrings";

const EXISTING_CREDENTIALS_ERROR = "Email, phone number, or username already taken."
const INVALID_EMAIL_OR_PHONE_ERROR = "Invalid email or phone number format."
const INVALID_USERNAME_ERROR = "Invalid username. Username cannot contain spaces and minimum length must be at least "
const INVALID_PASSWORD_ERROR = "Invalid password. The length must be at least "

// TODO: add password editing feature
// TODO: add validation for modifying user information (like in registration)

const PersonalInfo = () => {
    const { user } = useContext(AuthContext); // get user from auth context
    const url = 'users/find/' + user._id; //get the user id field from api
    const putUrl = 'users/' + user._id; //this is the url that is needed in order to make a put request
    const accessTok = user.accessToken;
    const auth = `Bearer ${accessTok}` //full authtoken
    //console.log(accessTok);
    //  console.log(user._id);
    //  console.log(user);
    //console.log(putUrl);

    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    /* retrieves the latest user info */
    const getUserInfo = () => {
        axios.get(url) //put the entire url including the user
            .then(res => {
                //console.log(res);
                setNumber(res.data.phone)
                setEmail(res.data.email)
                setUsername(res.data.username)
            }).catch(err => {
                console.log(err)
            })
    };
    /* get user info on first render */
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current === true) {
            getUserInfo();
            isFirstRender.current = false;
        }
    }, []);

    // update username
    const updateUserName = async () => {
        try {
            await axios.put(putUrl, {
                username: newUsername,
            }, {
                headers: {
                    token:
                        auth
                }
            });
        } catch (err) {
            console.log(err);
        }
        getUserInfo();
    };

    // update email
    const updateEmail = async (e) => {
        e.preventDefault();
        console.log("email is" + newEmail);
        try {
            await axios.put(putUrl, {
                email: newEmail,
            }, {
                headers: {
                    token:
                        auth
                }
            });
        } catch (err) {
            console.log(err);
        }
        getUserInfo();
    };

    // update phone 
    const updatePhone = async () => {
        try {
            await axios.put(putUrl, {
                phone: newNumber,
            }, {
                headers: {
                    token:
                        auth
                }
            });
        } catch (err) {
            console.log(err);
        }
        getUserInfo();
    };

    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newNumber, setNewNumber] = useState('')


    return (
        <div className="personalInfo">
            <Navbar />

            <div className="personalInfoForm">
                <div className="container">
                    <form>
                        <h1>Personal Info</h1>
                        <button className="infoButton">Phone Number: {number} </button>
                        <button className="infoButton">Email: {email} </button>
                        <button className="infoButton">Username: {username} </button>


                        <label>
                            <div className="infoType"> {"Change username: "}</div>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            <button onClick={updateUserName} className="formButton">Submit</button>

                        </label>

                        <label>
                            <div className="infoType"> {"Change email: "}</div>
                            <input
                                type="text"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="input"
                            />
                            <button onClick={updateEmail} className="formButton">Submit</button>
                        </label>

                        <label>
                            <div className="infoType"> {"Change phone number: "}</div>
                            <input
                                type="text"
                                value={newNumber}
                                onChange={(e) => setNewNumber(e.target.value)}
                                className="input"
                            />
                            <button onClick={updatePhone} className="formButton">Submit</button>
                        </label>

                        <Link to="/profPic" className="link">
                            <button className="button2">Edit profile picture </button>
                        </Link>

                        <Link to="/settings" className="link">
                            <button className="backButton">Back</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;


/*
<div className="infoForm">
                <div className="container">
                    <div className="personalDropdown">
                        <div className="header">
                            <span>Personal Information</span>

                        </div>
                        <div className="personalItems">
                            <Link to="" className="link">
                                <span className="highlight">Number: {number} </span>
                            </Link>
                            <Link to="" className="link">
                                <span className="highlight">Email: {email} </span>
                            </Link>
                            <Link to="" className="link">
                                <span className="highlight">Username: {username} </span>
                            </Link>
                            <Link to="/profPic" className="link">
                                <span className="highlight">Profile Pic: Click here to edit your Profile Picture! </span>
                            </Link>
                        </div>

                        <div className="formName">
                            <form onSubmit={() => updateUserName()}>
                                <label>Change username:
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </div>

                        <div className="formEmail">
                            <form onSubmit={() => updateEmail()}>
                                <label>Change email:
                                    <input
                                        type="text"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </div>

                        <div className="formPhone">
                            <form onSubmit={() => updatePhone()}>
                                <label>Change number:
                                    <input
                                        type="text"
                                        value={newNumber}
                                        onChange={(e) => setNewNumber(e.target.value)}
                                    />
                                </label>
                                <input type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

*/