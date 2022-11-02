// navigation bar at top of page
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import logo from "../fudstops_white_logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { logout } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import axios from 'axios';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext); // get auth context
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // need this to prevent default behavior or else login won't work
        logout(dispatch); // login and store the user in local storage (context)
        navigate("/login");
    }

    window.onscroll = () => { // want to make nav bar black when we scroll past y=0
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const [picture, setPicture] = useState('')
    const { user } = useContext(AuthContext); // get user from auth context
    const url = 'users/find/' + user._id; //get the user id field from api
    const getUserInfo = () => {
        axios.get(url) //put the entire url including the user
            .then(res => {
                setPicture(res.data.profilePic)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Link to="/" className="link">
                        <img
                            src={logo}
                            alt=""
                        />
                    </Link>
                    <Link to="/" className="link">
                        <span>Home</span>
                    </Link>
                    <Link to="/favorites" className="link">
                        <span>Favorites</span>
                    </Link>
                    <Link to="/recommendations" className="link">
                        <span>Recommendations</span>
                    </Link>
                    {/* <Link to="/foodInfo" className="link">
                        <span>Food Info</span>
                    </Link> */}
                    <div className="diningDropdown">
                        <span>Dining courts ▾</span>
                        <div className="diningDropdownOptions">
                            <Link to="/menu/Windsor" className="link">
                                <span className="highlight">Windsor</span>
                            </Link>
                            <Link to="/menu/Wiley" className="link">
                                <span className="highlight">Wiley</span>
                            </Link>
                            <Link to="/menu/Ford" className="link">
                                <span className="highlight">Ford</span>
                            </Link>
                            <Link to="/menu/Earhart" className="link">
                                <span className="highlight">Earhart</span>
                            </Link>
                            <Link to="/menu/Hillenbrand" className="link">
                                <span className="highlight">Hillenbrand</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right">
                    {getUserInfo()}
                    <Search className="icon" />
                    <Notifications className="icon" />
                    <img
                        src={picture} //new pic
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <Link to="/settings" className="link">
                                <span className="highlight">Settings</span>
                            </Link>
                            <Link to="/login" className="link"> {/* won't work until user becomes logged out */}
                                <span className="highlight" onClick={handleLogout}>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
