// JS for settings page
import Navbar from "../../components/navbar/Navbar";
import "../location/location.scss";
import "../menu/menu.scss";
import Footer from "../../components/footer/Footer";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import updatePreferences from "../../authContext/apiCalls";

const Preferences = () => {

    const { userPrev } = useContext(AuthContext); // get user from auth context
    const [user, setUser] = useState({});
    const [pref1, setPref1] = useState(false);
    const [pref2, setPref2] = useState(false);
    const [rest1, setRest1] = useState(false);
    const [rest2, setRest2] = useState(false);
    const [rest3, setRest3] = useState(false);
    const [rest4, setRest4] = useState(false);
    const [rest5, setRest5] = useState(false);
    const [rest6, setRest6] = useState(false);
    const [rest7, setRest7] = useState(false);
    const [rest8, setRest8] = useState(false);
    const [rest9, setRest9] = useState(false);
    const [rest10, setRest10] = useState(false);
    const [rest11, setRest11] = useState(false);
    const [prefs, setPrefs] = useState([]);
    const [rests, setRests] = useState([]);

    const handlePref1 = () => setPref1(!pref1);
    const handlePref2 = () => setPref2(!pref2);
    const handleRest1 = () => setRest1(!rest1);
    const handleRest2 = () => setRest2(!rest2);
    const handleRest3 = () => setRest3(!rest3);
    const handleRest4 = () => setRest4(!rest4);
    const handleRest5 = () => setRest5(!rest5);
    const handleRest6 = () => setRest6(!rest6);
    const handleRest7 = () => setRest7(!rest7);
    const handleRest8 = () => setRest8(!rest8);
    const handleRest9 = () => setRest9(!rest9);
    const handleRest10 = () => setRest10(!rest10);
    const handleRest11 = () => setRest11(!rest11);

    const handleSubmit = () => {
        
        const preferences = [];
        const restrictions = [];

        if(pref1) preferences.push("Vegetarian");
        if(pref2) preferences.push("Vegan");
        if(rest1) restrictions.push("Coconut");
        if(rest2) restrictions.push("Eggs");
        if(rest3) restrictions.push("Fish");
        if(rest4) restrictions.push("Gluten");
        if(rest5) restrictions.push("Sesame");
        if(rest6) restrictions.push("Shellfish");
        if(rest7) restrictions.push("Soy");
        if(rest8) restrictions.push("Tree Nuts");
        if(rest9) restrictions.push("Wheat");
        if(rest10) restrictions.push("Milk");
        if(rest11) restrictions.push("Peanuts");

        console.log(restrictions);
        console.log(preferences);

        setPrefs(preferences);
        setRests(restrictions);

        //updatePreferences({userPrev, preferences, restrictions}).then(returnedUser => setUser(returnedUser));

    }

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
                                <Box className="box"><span className="boxHeader">{"Preferences Page"}</span></Box>
                                <Box className="box"><span className="boxCaption">{"Select Your Dietary Preferences & Restrictions!"}</span></Box>
                                <Box className="box"><span className="boxDesc">{`Your Dietary Preferences: ${prefs.toString()}`}</span></Box>
                                <Box className="box"><span className="boxDesc">{`Your Dietary Restrictions: ${rests.toString()}`}</span></Box>

                                <Box className="box"><span className="boxHeader2">
                                        <Button variant="text" endIcon={<ArrowUpward />} onClick={handleSubmit}>Submit</Button>
                                    </span></Box>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div className="info2">
                                <FormGroup>
                                    <Box className="box"><span className="boxHeader">{"Preferences"}</span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Vegetarian" checked={pref1} onChange={handlePref1}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Vegan" checked={pref2} onChange={handlePref2}/>
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>
                        
                        <Grid item xs={1}>
                            <div className="info3-1">
                                <FormGroup  >
                                    <Box className="box"><span className="boxHeader">{"Restrictions"}</span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Coconut" checked={rest1} onChange={handleRest1}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Eggs" checked={rest2} onChange={handleRest2}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Fish" checked={rest3} onChange={handleRest3}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Gluten" checked={rest4} onChange={handleRest4}/>   
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>

                        <Grid item xs={1}>
                            <div className="info4">
                                <FormGroup  >
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Sesame" checked={rest5} onChange={handleRest5}/> 
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Shellfish" checked={rest6} onChange={handleRest6}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Soy" checked={rest7} onChange={handleRest7}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Tree Nuts" checked={rest8} onChange={handleRest8}/>
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>

                        <Grid item xs={1} className="info5">
                            <div className="pr-5">
                                <FormGroup  >
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Wheat" checked={rest9} onChange={handleRest9}/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Milk" checked={rest10} onChange={handleRest10}/>   
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Peanuts" checked={rest11} onChange={handleRest11}/>  
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>

                </Grid>
                
            </div>
            <Footer />
        </div>
    );
};

export default Preferences;