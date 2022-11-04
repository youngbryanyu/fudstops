// navigation bar at top of page
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState, useEffect, useRef } from "react";
import "./navbar.scss";
import logo from "../fudstops_white_logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { logout } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import axios from 'axios';
import React from "react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext); // get auth context
    const [data, setData] = React.useState([]);//update data with current data

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


    const { user } = useContext(AuthContext); // get user from auth context


    const getCall = async () => {

        try {
            const response = await axios.get(`/image/${user.username}`);
            const obj = response.data;
            setData(obj);
            console.log(obj);

        } catch (error) { console.log(error); }
    } 

    //call to display your new profile picture
    const isFirstRenderRatings = useRef(true); // don't do anything on first renders
    useEffect(() => {
        if (isFirstRenderRatings.current) {
            if (user.username != null) {
                getCall();
            }
        }
        isFirstRenderRatings.current = false;
    }, []);
    //mainidea : useEffect does an action on page load (or when items in the provided array change)
    //so well use effect to do the getCall on page load and then set the data to the result of that call
    //then display the data in the profile icon once call is done
    //also make sure the rendering is smaller because it prolly be large

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
                    <Search className="icon" />
                    <Notifications className="icon" />
                     {
                        data && (

                         <>
                    <div>
                        {data.map((singleData) => {
                            const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                            return data + String.fromCharCode(byte);
                            }, ''));
                            return <img src={`data:image/png;base64,${base64String}`} width="300"/>
                         })}
                    </div>
                </>
            )
        }
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
