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
    const [picture, setPicture] = useState('')

    
    //get
    const getUserInfo = () => {
        axios.get(url) //put the entire url including the user
            .then(res => {
                //console.log(res);
                setNumber(res.data.phone)
                setEmail(res.data.email)
                setUsername(res.data.username)
                setPicture(res.data.profilePic)
            }).catch(err => {
                console.log(err)
            })
    }
   
    // const getUserInfo = async () => {
    //     try {
    //        const res =  await axios.get(url);
    //         console.log(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    //update username
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
    };

    //update username
    const updateEmail = async () => {
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
    };

    //update username
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
    };

    //update username
    const updatePic = async () => {
        try {
            await axios.put(putUrl, {
                profilePic: newPicture,
            }, {
                headers: {
                    token:
                        auth
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newPicture, setNewPicture] = useState('')


    return (
        <div className="personalInfo">
            {getUserInfo()}
            <Navbar />
            <div className="left">
                <div className = "formName">
                    <form onSubmit={()=> updateUserName()}>
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

                <div className = "formEmail">
                <form onSubmit={()=> updateEmail()}>
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

                <div className = "formPhone">
                <form onSubmit={()=> updatePhone()}>
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

                <div className = "formPic">
                <form onSubmit={()=> updatePic()}>
                       <label>Add/Change/Delete profile picture:
                         <input 
                            type="text" 
                            value={newPicture}
                            onChange={(e) => setNewPicture(e.target.value)}
                        />
                      </label>
                     <input type="submit" />
                   </form>
                </div>

                <div className="buttons">
                    {/* <button onClick={updateUserInfo}> Change number </button>
                    <button onClick={updateUserInfo}> Change email </button>
                    <button onClick={updateUserInfo}> Change username </button>
                    <button onClick={updateUserInfo}> Add picture</button>
                    <button onClick={updateUserInfo}> Change picture</button>
                    <button onClick={updateUserInfo}> Delete picture</button> */}
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