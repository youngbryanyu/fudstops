// JS for settings page
import Navbar from "../../components/navbar/Navbar";
import Featured from "../home/featured/Featured";
import "./settings.scss";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";


const Settings = () => {
    return (
        <div className="settings">
            <Navbar />
            <h1>Info & Settings</h1>

             <div className="container">
                    <Link to="/personalInfo" className="link">
                        <button className="">Number</button>
                    </Link>
                    <Link to="/personalInfo" className="link">
                        <button className="">Email</button>
                    </Link>
                    <Link to="/personalInfo" className="link">
                        <button className="">Profile Picture</button>
                    </Link>
                    <button className="">Preferences</button>
                    <button className="">Location</button>
            </div>

            <div className="container2">
                    <button className="">Reccomendations</button>
                    <button className="">Report Error</button>
                    <button className="">Notfications</button>
                    <button className="">Delete Account</button>
                    <button className="">Logout</button>
            </div> 
            <Footer />
        </div>
    );
};

export default Settings;