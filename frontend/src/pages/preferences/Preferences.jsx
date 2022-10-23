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

    const [vegetarian, setVegetarian] = useState(false); // preferences
    const [vegan, setVegan] = useState(false);

    const [coconut, setCoconut] = useState(false); // restrictions
    const [eggs, setEggs] = useState(false);
    const [fish, setFish] = useState(false);
    const [gluten, setGluten] = useState(false);
    const [sesame, setSesame] = useState(false);
    const [shellfish, setShellfish] = useState(false);
    const [soy, setSoy] = useState(false);
    const [treeNuts, setTreeNuts] = useState(false);
    const [wheat, setWheat] = useState(false);
    const [milk, setMilk] = useState(false);
    const [peanuts, setPeanuts] = useState(false);

    const [prefs, setPrefs] = useState([]); // preferences
    const [rests, setRests] = useState([]); // restrictions

    // handlers for toggling checkboxes
    const handleVegetarian = () => setVegetarian(!vegetarian);
    const handleVegan = () => setVegan(!vegan);
    const handleCoconut = () => setCoconut(!coconut);
    const handleEggs = () => setEggs(!eggs);
    const handleFish = () => setFish(!fish);
    const handleGluten = () => setGluten(!gluten);
    const handleSesame = () => setSesame(!sesame);
    const handleShellfish = () => setShellfish(!shellfish);
    const handleSoy = () => setSoy(!soy);
    const handleTreeNuts = () => setTreeNuts(!treeNuts);
    const handleWheat = () => setWheat(!wheat);
    const handleMilk = () => setMilk(!milk);
    const handlePeanuts = () => setPeanuts(!peanuts);

    /**
     * Load initial preferences and restrictions on page render
     */
    const isFirstRender = useRef(true); // don't do anything on first render
    useEffect(() => {
        // Get initial preferences then set local variables to those.
        const setInitialPreferences = async () => {
            try {
                const response = await axios.get('preference/' + username);
                const initialPreferences = response.data.preferences;
                const preferences = []; // initial preferences to set
                if (initialPreferences.includes(VEGAN)) {
                    setVegan(true);
                    preferences.push(VEGAN);
                }
                if (initialPreferences.includes(VEGETARIAN)) {
                    setVegetarian(true);
                    preferences.push(VEGETARIAN);
                }

                setPrefs(preferences); // set preferences
            } catch (error) {
                console.log(error);
            }
        };

        // Get initial restrictions then set local variables to those.
        const setInitialRestrictions = async () => {
            try {
                const response = await axios.get('restriction/' + username);
                const initialRestrictions = response.data.restrictions;
                const restrictions = []; // restrictions to set initially
                if (initialRestrictions.includes(COCONUT)) {
                    setCoconut(true);
                    restrictions.push(COCONUT);
                }
                if (initialRestrictions.includes(EGGS)) {
                    setEggs(true);
                    restrictions.push(EGGS);
                }
                if (initialRestrictions.includes(FISH)) {
                    setFish(true);
                    restrictions.push(FISH);
                }
                if (initialRestrictions.includes(GLUTEN)) {
                    setGluten(true);
                    restrictions.push(GLUTEN);
                }
                if (initialRestrictions.includes(SESAME)) {
                    setSesame(true);
                    restrictions.push(SESAME);
                }
                if (initialRestrictions.includes(SHELLFISH)) {
                    setShellfish(true);
                    restrictions.push(SHELLFISH);
                }
                if (initialRestrictions.includes(SOY)) {
                    setSoy(true);
                    restrictions.push(SOY);
                }
                if (initialRestrictions.includes(TREE_NUTS)) {
                    setTreeNuts(true);
                    restrictions.push(TREE_NUTS);
                }
                if (initialRestrictions.includes(WHEAT)) {
                    setWheat(true);
                    restrictions.push(WHEAT);
                }
                if (initialRestrictions.includes(MILK)) {
                    setMilk(true);
                    restrictions.push(MILK);
                }
                if (initialRestrictions.includes(PEANUTS)) {
                    setPeanuts(true);
                    restrictions.push(PEANUTS);
                }

                setRests(restrictions); // set restrictions
            } catch (error) {
                console.log(error);
            }
        };
        if (isFirstRender.current) {
            setInitialPreferences();
            setInitialRestrictions();
        }
        isFirstRender.current = false;
    // eslint-disable-next-line
    }, []);

    /**
     * Update preferences when any of the preferences changes. This will trigger the useEffect below.
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
     * Update the preferences in the database when prefs changes, not on first render though. Triggered by useEffect above
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
                console.log("successfully updated preferences");
            } catch (error) {
                console.log("failed to update preferences: " + error);
            }
        }

        updatePreferencesInDB(); // update the preferences in the database
    // eslint-disable-next-line
    }, [prefs]);

    /**
     * Update restrictions when any of the restrictions changes. This will trigger the useEffect below.
     */
     const isFirstRender_updateRestrictions = useRef(true); // don't do anything on first render
     useEffect(() => {
         if (isFirstRender_updateRestrictions.current) {
            isFirstRender_updateRestrictions.current = false;
             return; // don't update DB on initial render
         }
 
         const restrictions = []; // set restrictions
         if (coconut) restrictions.push(COCONUT);
         if (eggs) restrictions.push(EGGS);
         if (fish) restrictions.push(FISH);
         if (gluten) restrictions.push(GLUTEN);
         if (sesame) restrictions.push(SESAME);
         if (shellfish) restrictions.push(SHELLFISH);
         if (soy) restrictions.push(SOY);
         if (treeNuts) restrictions.push(TREE_NUTS);
         if (wheat) restrictions.push(WHEAT);
         if (milk) restrictions.push(MILK);
         if (peanuts) restrictions.push(PEANUTS);
 
         setRests(restrictions); // triggers useEffect below
     }, [coconut, eggs, fish, gluten, sesame, shellfish, soy, treeNuts, wheat, milk, peanuts]);
 
     /**
      * Update the restrictions in the database when restrictions changes, not on first render though. Triggered by useEffect above
      */
     const isFirstRender_updateRestsDB = useRef(true); // don't do anything on first render
     useEffect(() => {
         if (isFirstRender_updateRestsDB.current) {
             isFirstRender_updateRestsDB.current = false;
             return; // don't update DB on initial render
         }
 
         const updateRestrictionsInDB = async () => {
             try {
                 await axios.post('restriction', {
                     username: username,
                     restrictions: rests
                 });
                 console.log("successfully updated restrictions: " + rests);
             } catch (error) {
                 console.log("failed to update restrictions: " + error);
             }
         }
 
         updateRestrictionsInDB(); // update the restrictions in the database
     // eslint-disable-next-line
     }, [rests]);

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
                            {/* <Box className="box"><span className="boxDesc">{`Your Dietary Preferences: ${prefs.toString()}`}</span></Box> */}
                            {/* <Box className="box"><span className="boxDesc">{`Your Dietary Restrictions: ${rests.toString()}`}</span></Box> */}

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
                                    <FormControlLabel control={<Checkbox />} label={COCONUT} checked={coconut} onChange={handleCoconut} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={EGGS} checked={eggs} onChange={handleEggs} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={FISH} checked={fish} onChange={handleFish} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={GLUTEN} checked={gluten} onChange={handleGluten} />
                                </span></Box>
                            </FormGroup>
                        </div>
                    </Grid>

                    <Grid item xs={1}>
                        <div className="info4">
                            <FormGroup  >
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={SESAME} checked={sesame} onChange={handleSesame} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={SHELLFISH} checked={shellfish} onChange={handleShellfish} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={SOY} checked={soy} onChange={handleSoy} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={TREE_NUTS} checked={treeNuts} onChange={handleTreeNuts} />
                                </span></Box>
                            </FormGroup>
                        </div>
                    </Grid>

                    <Grid item xs={1} className="info5">
                        <div className="pr-5">
                            <FormGroup  >
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={WHEAT} checked={wheat} onChange={handleWheat} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={MILK} checked={milk} onChange={handleMilk} />
                                </span></Box>
                                <Box className="box"><span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={PEANUTS} checked={peanuts} onChange={handlePeanuts} />
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