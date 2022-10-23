// JS for settings page
import Navbar from "../../components/navbar/Navbar";
import "../location/location.scss";
import "../menu/menu.scss";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';

const Settings = () => {

    let url = "https://cff2.earth.com/uploads/2018/10/18192727/What-determines-our-food-preferences-and-decisions.jpg";

    return (
        <div className="home">
            <Navbar />
            <div className="location"> 
                <img
                    src={url}
                    alt=""
                />

                <Grid container rowSpacing={10} columnSpacing={{ xs: 10, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <div className="info">
                                <Box className="box"><span className="boxHeader">{"Info & Settings"}</span></Box>
                                <Box className="box"><span className="boxDesc">{"Edit Your Profile, Preferences, Account Info!"}</span></Box> 
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div className="info2">
                                <Box className="box">
                                    <Link to="/personalInfo">
                                        <button className="boxHeader">Personal Information</button>
                                    </Link>
                                </Box>
                                <Box className="box">
                                    <Link to="/preferences">
                                        <button className="boxHeader">Dietary Preferences</button>
                                    </Link>
                                </Box>
                                <Box className="box">
                                    <Link to="">
                                        <button className="boxHeader">Location</button>
                                    </Link>
                                </Box>
                                <Box className="box">
                                    <Link to="">
                                        <button className="boxHeader">Recommendations</button>
                                    </Link>
                                </Box>
                            </div>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <div className="info3">
                                <Box className="box">
                                    <Link to="">
                                        <button className="boxHeader">Report Error</button>
                                    </Link>
                                </Box>
                                <Box className="box">
                                    <Link to="">
                                        <button className="boxHeader">Notifications</button>
                                    </Link>
                                </Box>
                                <Box className="box">
                                    <Link to="">
                                        <button className="boxHeader">Delete Account</button>
                                    </Link>
                                </Box>
                                <Box className="box">
                                    <Link to="">
                                        <button className="boxHeader">Logout</button>
                                    </Link>
                                </Box>
                            </div>
                        </Grid>
                </Grid>
                
            </div>
            <Footer />
        </div>
    );
};

export default Settings;