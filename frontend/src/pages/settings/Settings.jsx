// JS for settings page
import Navbar from "../../components/navbar/Navbar";
import "./settings.scss";
// import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import { logout } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";



const Settings = () => {
    const { dispatch } = useContext(AuthContext); // get auth context
    const navigate = useNavigate(); 

    /**
     * Logs the user out
     */
    const handleLogout = (e) => {
        e.preventDefault(); // need this to prevent default behavior or else login won't work
        logout(dispatch); // login and store the user in local storage (context)
        navigate("/login");
    }

    return (
        <div className="settings">
            <Navbar />

            <Grid container rowSpacing={10} columnSpacing={{ xs: 10, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <div className="about">
                        <Box className="box"><span className="title">{"Info & Settings"}</span></Box>
                        <Box className="box"><span className="boxDesc">{"Edit Your Profile, Preferences, Account Info!"}</span></Box>
                    </div>
                </Grid>

                <Grid item xs={3}>
                    <div className="info2">
                        <Box className="box">
                            <Link to="/personalInfo" className="link">
                                <button className="header">Personal Information</button>
                            </Link>
                        </Box>
                        <Box className="box">
                            <Link to="/preferences" className="link">
                                <button className="header">Dietary Preferences</button>
                            </Link>
                        </Box>
                        <Box className="box">
                            <Link to="" className="link">
                                <button className="header">Location</button>
                            </Link>
                        </Box>
                        <Box className="box">
                            <Link to="" className="link">
                                <button className="header">Recommendations</button>
                            </Link>
                        </Box>
                    </div>
                </Grid>

                <Grid item xs={3}>
                    <div className="info3">
                        <Box className="box">
                            <Link to="" className="link">
                                <button className="header">Report Error</button>
                            </Link>
                        </Box>
                        <Box className="box">
                            <Link to="" className="link">
                                <button className="header">Notifications</button>
                            </Link>
                        </Box>
                        <Box className="box">
                            <Link to="" className="link">
                                <button className="header">Delete Account</button>
                            </Link>
                        </Box>
                        <Box className="box">
                            <Link to="/login" className="link">
                                <span className="header" onClick={handleLogout}>Logout</span>
                            </Link>
                        </Box>
                    </div>
                </Grid>
            </Grid>
            {/* <Footer /> */}
        </div>
    );
};

export default Settings;