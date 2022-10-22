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
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

// preferences
const VEGAN = "Vegan";
const VEGETARIAN = "Vegetarian";

// restrictions
const COCONUT = "Coconut";
const EGGS = "Eggs";
const FISH = "Fish";
const GLUTEN = "Gluten";
const SESAME = "Sesame";
const SHELLFISH = "Shellfish";
const SOY = "Soy";
const TREE_NUTS = "Tree Nuts";
const WHEAT = "Wheat";
const MILK = "Milk";
const PEANUTS = "Peanuts";

const Preferences = () => {
    const { user } = useContext(AuthContext); // get user from auth context, can directly index into its fields
    let username = user.username;

    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
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

    const [prefs, setPrefs] = useState([]); // preferences
    const [rests, setRests] = useState([]); // restrictions

    // handlers for toggling checkboxes
    const handleVegetarian = () => setVegetarian(!vegetarian);
    const handleVegan = () => setVegan(!vegan);
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

    /**
     * Load initial preferences on page render
     */
    const isFirstRender = useRef(true); // don't do anything on first render
    useEffect(() => {
        if (isFirstRender.current) {
            setInitialPreferences();
        }
        isFirstRender.current = false;
    }, []);

    /**
     * Get initial preferences then set local variables to those. Called from the useeffect above
     */
    const setInitialPreferences = async () => {
        try {
            const response = await axios.get('preference/' + username);
            const initialPreferences = response.data.preferences;
            if (initialPreferences.includes('Vegan')) {
                // console.log("set vegan to true initially")
                setVegan(true);
            }
            if (initialPreferences.includes('Vegetarian')) {
                // console.log("set vegetarian to true initially")
                setVegetarian(true);
            }

            const preferences = []; // set preferences
            if (vegetarian) preferences.push(VEGETARIAN);
            if (vegan) preferences.push(VEGAN);
            setPrefs(preferences);

            // console.log(initialPreferences);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Update preferences when any of the preferences changes
     */
    const isFirstRender_update = useRef(true); // don't do anything on first render
    useEffect(() => {
        if (isFirstRender_update.current) {
            isFirstRender_update.current = false;
            return; // don't update DB on initial render
        }

        const preferences = []; // set preferences
        if (vegetarian) preferences.push(VEGETARIAN);
        if (vegan) preferences.push(VEGAN);

        setPrefs(preferences); // triggers useEffect below
    }, [vegan, vegetarian]);

    /**
     * Update the preferences in the database when prefs changes, not on first render though.
     */
    const isFirstRender_updatePrefsDB = useRef(true); // don't do anything on first render
    useEffect(() => {
        if (isFirstRender_updatePrefsDB.current) {
            isFirstRender_updatePrefsDB.current = false;
            return; // don't update DB on initial render
        }

        const updatePreferencesInDB = async () => {
            try {
                await axios.post('preference', {
                    username: username,
                    preferences: prefs
                });
                // console.log("successfully updated preferences");
            } catch (error) {
                // console.log("failed to update preferences: " + error);
            }
        }

        updatePreferencesInDB(); // update the preferences in the database
    }, [prefs]);

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
                            </span></Box>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="info2">
                            <FormGroup>
                                <Box className="box"><span className="boxHeader">{"Preferences"}</span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={VEGETARIAN} checked={vegetarian} onChange={handleVegetarian} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={VEGAN} checked={vegan} onChange={handleVegan} />
                                </span></Box>
                            </FormGroup>
                        </div>
                    </Grid>

                    <Grid item xs={1}>
                        <div className="info3-1">
                            <FormGroup  >
                                <Box className="box"><span className="boxHeader">{"Restrictions"}</span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={COCONUT} checked={rest1} onChange={handleRest1} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={EGGS} checked={rest2} onChange={handleRest2} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={FISH} checked={rest3} onChange={handleRest3} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={GLUTEN} checked={rest4} onChange={handleRest4} />
                                </span></Box>
                            </FormGroup>
                        </div>
                    </Grid>

                    <Grid item xs={1}>
                        <div className="info4">
                            <FormGroup  >
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={SESAME} checked={rest5} onChange={handleRest5} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={SHELLFISH} checked={rest6} onChange={handleRest6} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={SOY} checked={rest7} onChange={handleRest7} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={TREE_NUTS} checked={rest8} onChange={handleRest8} />
                                </span></Box>
                            </FormGroup>
                        </div>
                    </Grid>

                    <Grid item xs={1} className="info5">
                        <div className="pr-5">
                            <FormGroup  >
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={WHEAT} checked={rest9} onChange={handleRest9} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={MILK} checked={rest10} onChange={handleRest10} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={PEANUTS} checked={rest11} onChange={handleRest11} />
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