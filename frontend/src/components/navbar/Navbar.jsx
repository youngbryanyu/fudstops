// navigation bar at top of page
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import logo from "../fudstops_white_logo.png"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img
                        src={logo}
                        alt=""
                    />
                    <span>Home</span>
                    <span>Favorites</span>
                    <div className="diningDropdown">
                        <span>Dining courts ▾</span>
                        <div className="diningDropdownOptions">
                            <span className="highlight">Windsor</span>
                            <span className="highlight">Wiley</span>
                            <span className="highlight">Ford</span>
                            <span className="highlight">Earhart</span>
                            <span className="highlight">Hillenbrand</span>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <Notifications className="icon" />
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span className="highlight">Settings</span>
                            <span className="highlight">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;