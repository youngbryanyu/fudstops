// Javascript for page displaying recommendations
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../authContext/AuthContext";
import "./recommendations.scss";
import axios from "axios";
import { useRef } from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



//the layout will be new recommendation page that has a 
//list component on left, a filter component on right
//1st filter option is "Give Me Recommendations Based On Saved Items"
//this needs to first get all saved items
//have a weightage for attributes (For example, Vegan - 4, Vegetarian - 1, Eggs - 6, Peanuts - 0 ...)
//go through each saved item and add +1 to weightage if attribute is true in that item
//at end select the attributes that are greater than or equal to 3
//(if no attributes greater than 3, return all items)
//(also indicate to user to save more items to get more personalized recommendations)
//then return menu items that fit those more heavily weighted attributes
//2nd filter option is "Give Me Recommendations Based On My Prefs/Rests"
//just get all items that fit the users prefs & rests
//limit results to 15 items

const useStyles = makeStyles((theme) => ({
    root: {
        color: "black",
    },
    selected: {
        color: "white"
    }
}));

const Recommendations = () => {

    const classes = useStyles();
    const [recsSaved, setRecsSaved] = useState([]); //keep track of recs of saved items
    const [courtsMenu, setCourtsMenu] = useState([""]); //the current items displayed in list
    const [recsPrefsRests, setRecsPrefsRests] = useState([]); //keep track of recs of prefs and rests
    const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext);
    let username = user.username;
    const loading = useRef(true);

    /* fields for recommendation type */
    const BASED_ON_PREFS = 0;
    const BASED_ON_SAVED = 1;
    const [recommendationType, setRecommendationType] = useState(BASED_ON_PREFS);

    const [menuBeforeSortPop, setMenuBeforeSortPop] = useState([]); // sort the menu items based on the rating
    const [shouldSortPop, setShouldSortPop] = useState(false); //should sort based ff item popularity



    /* fields for meal type */
    const ALL_MEALS = 2;
    const BREAKFAST = 3;
    const BRUNCH = 4;
    const LUNCH = 5;
    const LATE_LUNCH = 6
    const DINNER = 7
    const [mealType, setMealType] = useState(ALL_MEALS);
    const mealTypes = ["", "", "", "Breakfast", "Brunch", "Lunch", "Late Lunch", "Dinner"];

    /* get recommendations based on saved items */
    async function getRecommendationsBasedOnSavedItems(mealType) {
        try {
            let response;
            if (mealType === ALL_MEALS) { /* all types of meals */
                response = await axios.get(`/recommendations/saved/${username}`);
            } else { /* specific meal type */
                response = await axios.get(`/recommendations/saved/${username}/${mealType}`);
            }
            const prefsRestsObj = response.data;

            if (prefsRestsObj.message !== "All Good!") { /* if not all good get all items from dining court today */
                setCourtsMenu(prefsRestsObj.items);
                setRecsSaved(prefsRestsObj.items);
                setMessage(prefsRestsObj.message);
            } else {
                // get items matching prefs and rests
                const selectedMealType = mealTypes[mealType] // get selected meal type
                const res = await axios.post("/menuInfo/prefsAndRests/" + selectedMealType, {
                    preferences: prefsRestsObj.preferences,
                    restrictions: prefsRestsObj.restrictions
                });

                const items = res.data;
                loading.current = false // not loading
                setCourtsMenu(items);
                setRecsSaved(items);
                setMessage(prefsRestsObj.message);
            }
        } catch (error) { console.log(error) };
    };

    /* get recommendations based on prefs and rests */
    async function getRecommendationsBasedOnPrefsRests(mealType) {
        try {
            // first do two get calls to get the users prefs and rests
            // then do a third call to get the items matching those prefs and rests
            const prefsResponse = await axios.get(`/preference/${username}`);
            let prefs = [];
            if (prefsResponse !== "Error retrieving preferences (user likely doesn't have any yet)") {
                prefs = prefsResponse.data.preferences;
            }

            const restsResponse = await axios.get(`/restriction/${username}`);
            let rests = [];
            if (restsResponse !== "Error retrieving restrictions (user likely doesn't have any yet)") {
                rests = restsResponse.data.restrictions;
            }

            const selectedMealType = mealTypes[mealType] // get selected meal type
            const response = await axios.post(`/menuInfo/prefsAndRests/` + selectedMealType, {
                preferences: prefs,
                restrictions: rests
            });

            const courtsItems = response.data;
            loading.current = false // not loading
            setCourtsMenu(courtsItems);
            setRecsPrefsRests(courtsItems);

        } catch (error) { console.log(error) };
    };

    const handleRecTypeChange = (event) => { //this is for handling the filters options
        loading.current = true // loading
        if (event.target.value === BASED_ON_SAVED) {
            setRecommendationType(BASED_ON_SAVED)
        } else if (event.target.value === BASED_ON_PREFS) {
            setRecommendationType(BASED_ON_PREFS)
        }
    };

    const handleMealChange = (event) => {
        loading.current = true // loading
        if (event.target.value === ALL_MEALS) {
            setMealType(ALL_MEALS)
        } else if (event.target.value === BREAKFAST) {
            setMealType(BREAKFAST)
        } else if (event.target.value === BRUNCH) {
            setMealType(BRUNCH)
        } else if (event.target.value === LUNCH) {
            setMealType(LUNCH)
        } else if (event.target.value === LATE_LUNCH) {
            setMealType(LATE_LUNCH)
        } else if (event.target.value === DINNER) {
            setMealType(DINNER);
        }
    };

    /* parses recommended items from backend based on recommendation type and meal type when those fields change */
    useEffect(() => {
        if (recommendationType === BASED_ON_SAVED) {
            getRecommendationsBasedOnSavedItems(mealType);
            setCourtsMenu(recsSaved);
        } else if (recommendationType === BASED_ON_PREFS) {
            getRecommendationsBasedOnPrefsRests(mealType);
            setCourtsMenu(recsPrefsRests);
        }
    }, [recommendationType, mealType]);

    function listItem(item) { //display a menu item
        const name = item.name;
        const id = item.ID

        return (
            <Link to={`/foodInfo/${id}`} className="link">
                <ListItem component="div" disablePadding button={true}>
                    <span className="header">{`${name}`}</span>
                </ListItem>
            </Link>
        );
    }

    const handleSortClickPop = () => {
        setShouldSortPop(!shouldSortPop);
    }

     /*Sort by rating(popular items) */
     const isFirstRenderPop = useRef(true);
     useEffect(() => {
         if (isFirstRenderPop.current === true) {
             isFirstRenderPop.current = false;
             return;
         }
         // sort courts menu then set it to the sorted
         if(shouldSortPop) {
             setMenuBeforeSortPop(JSON.parse(JSON.stringify(courtsMenu))); 
             courtsMenu.sort((a,b) => (a.avgRating < b.avgRating) ? 1 : ((b.avgRating < a.avgRating) ? -1 : 0)); //make the most highly rated items appear at the top of the list
 
         }else if(!shouldSortPop) {
             setCourtsMenu(menuBeforeSortPop);
         }
         // eslint-disable-next-line
     }, [shouldSortPop]);



    console.log(courtsMenu);

    return (
        <div className="menu">
            <Navbar />
            <div>
                <h4 className="moreSpace">{"View Recommended Items!"}</h4><h6>(click to view info)</h6>
                <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }} className="list">
                    <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                        {
                            courtsMenu.length !== 0 ? (
                                <List>
                                    {courtsMenu.map((item) => listItem(item))}
                                </List>
                            ) : (
                                loading.current ? (
                                    <List>
                                        <ListItem component="div" disablePadding button={true}>
                                            <span className="header">{"Loading..."}</span>
                                        </ListItem>
                                    </List>
                                ) : (
                                    <List>
                                        <ListItem component="div" disablePadding button={true}>
                                            <span className="header">{"Nothing served at this time."}</span>
                                        </ListItem>
                                    </List>
                                )
                            )
                        }
                    </Paper>
                </Box>
            </div>
            <div className="filter">
                <h4>Select Your Filters!</h4><h6>(click to open options)</h6>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl error fullWidth sx={{ m: 1, minWidth: 120 }}  >
                        <InputLabel>Filters</InputLabel>
                        <Select id="demo-simple-select" value={recommendationType} label="Filter" onChange={handleRecTypeChange}
                            classes={{ root: classes.root, select: classes.selected }}
                        >
                            <MenuItem value={0}>Recommendations Based On My Prefs/Rests</MenuItem>
                            <MenuItem value={1}>Recommendations Based On Saved Items</MenuItem>
                        </Select>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={"Sort by Item Popularity"} checked={shouldSortPop} onChange={handleSortClickPop}/>
                    </FormGroup>
                </Box>
                <div>
                    {
                        message !== "All Good!" && (
                            <>
                                <h4>{`${message}`}</h4>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="filter">
                <h4>Select Meals:</h4><h6>(click to view options)</h6>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl error fullWidth sx={{ m: 1, minWidth: 120 }}  >
                        <InputLabel>Filters</InputLabel>
                        <Select id="demo-simple-select" value={mealType} label="Filter" onChange={handleMealChange}
                            classes={{ root: classes.root, select: classes.selected }}
                        >
                            <MenuItem value={2}>{`All Meal types`}</MenuItem>
                            <MenuItem value={3}>{`Breakfast`}</MenuItem>
                            <MenuItem value={4}>{`Brunch`}</MenuItem>
                            <MenuItem value={5}>{`Lunch`}</MenuItem>
                            <MenuItem value={6}>{`Late Lunch`}</MenuItem>
                            <MenuItem value={7}>{`Dinner`}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            {/* <Footer /> */}
        </div>
    );

};

export default Recommendations;
