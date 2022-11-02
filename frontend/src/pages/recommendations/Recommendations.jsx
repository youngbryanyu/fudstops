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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import Navbar from "../../components/navbar/Navbar";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../authContext/AuthContext";
import "./recommendations.scss";
import axios from "axios";

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
    const [courtsMenu, setCourtsMenu] = useState([]); //the current items displayed in list
    const [recsPrefsRests, setRecsPrefsRests] = useState([]); //keep track of recs of prefs and rests
    const [view, setView] = useState(""); //keep track of which filter option is currently chosen
    const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext);
    let username = user.username;

    const handleChange = (event) => { //this is for handling the filters options

        if (event.target.value == 1) { //this means the user selected Items Matching My Prefs & Rests

            setView("RecsBasedOnSaved");
            setCourtsMenu(recsSaved);

        } else if (event.target.value == 2) { //this means user wants to select from checkbox

            setView("RecsBasedOnPrefsRests");
            setCourtsMenu(recsPrefsRests);

        }

    };

    /**
    * Load dining courts items on page load and alters anytime the location changes
    */
    useEffect(() => {

        const getRecommendationsBasedOnSavedItems = async () => {

            try {
                const response = await axios.get(`/recommendations/saved/${username}`);
                const prefsRestsObj = response.data;

                if (prefsRestsObj.message != "All Good!") {

                    setCourtsMenu(prefsRestsObj.items);
                    setRecsSaved(prefsRestsObj.items);
                    setMessage(prefsRestsObj.message);

                } else {

                    //call other endpoint with the prefs and rests

                    const res = await axios.post("/menuInfo/prefsAndRests", {
                        preferences: prefsRestsObj.preferences,
                        restrictions: prefsRestsObj.restrictions
                    });

                    const items = res.data;
                    setCourtsMenu(items);
                    setRecsSaved(items);
                    setMessage(prefsRestsObj.message);

                }



            } catch (error) { console.log(error) };

        };

        const getRecommendationsBasedOnPrefsRests = async () => {

            try {

                //first do two get calls to get the users prefs and rests
                //then do a third call to get the items matching those prefs and rests

                const prefsResponse = await axios.get(`/preference/${username}`);
                let prefs = [];
                if(prefsResponse != "Error retrieving preferences (user likely doesn't have any yet)") {
                    prefs = prefsResponse.data.preferences;
                }

                const restsResponse = await axios.get(`/restriction/${username}`);
                let rests = [];
                if(restsResponse != "Error retrieving restrictions (user likely doesn't have any yet)") {
                    rests = restsResponse.data.restrictions;
                }
                
                const response = await axios.post(`/menuInfo/prefsAndRests`, {
                    preferences: prefs,
                    restrictions: rests
                });

                const courtsItems = response.data;
                setRecsPrefsRests(courtsItems);

            } catch (error) { console.log(error) };

        };

        if (username != null) {
            getRecommendationsBasedOnSavedItems();
            getRecommendationsBasedOnPrefsRests();
        }

        // eslint-disable-next-line
    }, []);


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

    return (
        <div className="menu">
            <Navbar />
            <div>
                <h4 className="moreSpace">{"View Recommended Items!"}</h4><h6>(click to view info)</h6>
                <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }} className="list">
                    <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                        <List>
                            {courtsMenu.map((item) => listItem(item))}
                        </List>
                    </Paper>
                </Box>
            </div>
            <div className="filter">
                <h4>Select Your Filters!</h4><h6>(click to open options)</h6>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl error fullWidth sx={{ m: 1, minWidth: 120 }}  >
                        <InputLabel>Filters</InputLabel>
                        <Select id="demo-simple-select" value={view} label="Filter" onChange={handleChange}
                            classes={{ root: classes.root, select: classes.selected }}
                        >
                            <MenuItem value={1}>Recommendations Based On Saved Items</MenuItem>
                            <MenuItem value={2}>Recommendations Based On My Prefs/Rests</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div>
                    {
                        message != "All Good!" && (

                            <>

                                <h4>{`${message}`}</h4>

                            </>

                        )
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );

};

export default Recommendations;