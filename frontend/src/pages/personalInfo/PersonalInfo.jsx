// Javascript for page displaying a user's favorite menu items
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./personalInfo.scss";
import axios from 'axios';
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { useState } from "react";

const PersonalInfo = () => {
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [picture, setPicture] = useState('')


    const { user } = useContext(AuthContext); // get user from auth context
    const url = 'users/find/' + user._id; //get the user id field from api
    // console.log(user._id);
    // console.log(user);

    const getUserInfo = () => {
         axios.get(url) //put the entire url including the user
        .then(res => {
            console.log(res);
            setNumber(res.data.phone)
            setEmail(res.data.email)
            setUsername(res.data.username)
            setPicture(res.data.profilePic)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="personalInfo">
            <Navbar />
            <div className="left">
                <div className="personalDropdown">
                    <button onClick={getUserInfo}>Get Your Information</button>
                    <div className="header">
                        <span>Personal Information</span>
                    </div>
                    <div className="personalItems">
                        <Link to="" className="link">
                            <span className="highlight">Number: </span>
                            {<p>{number}</p>}
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Email: </span>
                            {<p>{email}</p>}
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Username: </span>
                            {<p>{username}</p>}
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Profile Pic: </span>
                            {<p>{picture}</p>}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;