// Javascript for page displaying a user's favorite menu items
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./personalInfo.scss";
import axios from 'axios';
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { useState } from "react";


const PersonalInfo = () => {
    const { user } = useContext(AuthContext); // get user from auth context
    const url = 'users/find/' + user._id; //get the user id field from api
    // console.log(user._id);
    // console.log(user);
    
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [picture, setPicture] = useState('')

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

    const updateUserInfo = () => {
        axios.put(url) //put the entire url including the user
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
            {getUserInfo()}
            <Navbar />
            <div className="left">
                <div className= "buttons">
                    <button onClick={updateUserInfo}> Change number </button>
                    <button onClick={updateUserInfo}> Change email </button>
                    <button onClick={updateUserInfo}> Change username </button>
                    <button onClick={updateUserInfo}> Add picture</button>
                    <button onClick={updateUserInfo}> Change picture</button>
                    <button onClick={updateUserInfo}> Delete picture</button>
                </div>
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
                        <Link to="" className="link">
                            <span className="highlight">Profile Pic: {picture} </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;