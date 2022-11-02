// Javascript for home page

// Javascript for page displaying menu items for a dining court
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
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from "../../authContext/AuthContext";
import "./home.scss";
import axios from "axios";

const DINING_COURTS = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"];


const useStyles = makeStyles((theme) => ({
    root: {
        color: "black",
    },
    selected: {
        color: "white"
    }
}));

const Home = () => {

    const classes = useStyles();
    let { location } = useParams();
    const [allItems, setAllItems] = useState([]); //keep track of all menu items
    const [selectedItems, setSelectedItems] = useState([]); //keep track of the selected checkbox items
    const [courtsMenu, setCourtsMenu] = useState([]); //the current items displayed in list
    const [matchingItems, setMatchingItems] = useState([]); //keep track of matching user's prefs items
    const [view, setView] = useState(""); //keep track of which filter option is currently chosen
    const { user } = useContext(AuthContext);
    let username = user.username;

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

    let prefs = [];
    let rests = [];

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


    const [shouldSort, setShouldSort] = useState(false);
    const [menuBeforeSort, setMenuBeforeSort] = useState([]);


    const handleSortClick = () => {
        setShouldSort(!shouldSort);

    }
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current === true) {
            isFirstRender.current = false;
            return;
        }
        if (shouldSort) {
            setMenuBeforeSort(JSON.parse(JSON.stringify(courtsMenu)));
            courtsMenu.sort();
        } else {
            setCourtsMenu(menuBeforeSort);
        }
    }, [shouldSort]);



    const handleSelectPrefsClick = () => { //this is for handling the submit button of preferences

        prefs = [];
        rests = [];

        if (vegetarian) prefs.push(VEGETARIAN);
        if (vegan) prefs.push(VEGAN);
        if (coconut) rests.push(COCONUT);
        if (eggs) rests.push(EGGS);
        if (fish) rests.push(FISH);
        if (gluten) rests.push(GLUTEN);
        if (sesame) rests.push(SESAME);
        if (shellfish) rests.push(SHELLFISH);
        if (soy) rests.push(SOY);
        if (treeNuts) rests.push(TREE_NUTS);
        if (wheat) rests.push(WHEAT);
        if (milk) rests.push(MILK);
        if (peanuts) rests.push(PEANUTS);

        const getItemsFromSelections = async () => {
            try {
                const matchingCourts = [];
                // post for each dining court
                for (let diningCourt of DINING_COURTS) {
                    const response = await axios.post(`/menuInfo/prefsAndRests/${diningCourt}`, {
                        preferences: prefs,
                        restrictions: rests
                    });
                    const courtsItems = response.data;
                    if (courtsItems.length > 0) { // if more than 0 dining items match from the dining court, push it to the dining courts list
                        matchingCourts.push(diningCourt);
                        console.log("Items from " + diningCourt + " that match prefs/rests is " + courtsItems.length);
                    }
                }

                // set dining courts to those that have items that match selected dietary preferences in filter menu
                setSelectedItems(matchingCourts);
                setCourtsMenu(matchingCourts);
            } catch (error) { console.log(error) };
        };
        getItemsFromSelections();
    }

    const handleChange = (event) => { // this is for handling the filters options
        if (event.target.value == 1) { // this means the user selected Items Matching My Prefs & Rests
            setView("MatchingItems");
            setCourtsMenu(matchingItems);
        } else if (event.target.value == 2) { // this means user wants to select from checkbox
            setView("SelectPrefs");
            setCourtsMenu(selectedItems);
        } else if (event.target.value == 3) { //this means the user wants to view all items
            setView("AllItems");
            setCourtsMenu(allItems);
        }
    };

    /**
    * Load dining courts items on page load and alters anytime the location changes
    */
    useEffect(() => {

        const getAllDiningCourts = async () => {
            try {
                setAllItems(DINING_COURTS);
                setCourtsMenu(DINING_COURTS);
            } catch (error) {
                console.log(error)
            };
        };

        const getItemsMatchingUser = async () => {
            try {
                const matchingCourts = [];
                // post for each dining court
                for (let diningCourt of DINING_COURTS) {
                    const response = await axios.get(`/menuInfo/prefs/${diningCourt}/${username}`);
                    const courtsItems = response.data;
                    if (courtsItems.length > 0) { // if more than 0 dining items match from the dining court, push it to the dining courts list
                        matchingCourts.push(diningCourt);
                        console.log("Items from " + diningCourt + " that match prefs/rests is " + courtsItems.length);
                    }
                }
                setMatchingItems(matchingCourts);
            } catch (error) {
                console.log(error)
            };
        };

        getAllDiningCourts();
        getItemsMatchingUser();

        // eslint-disable-next-line
    }, [location]);

    /* Gets the dining court and creates a link for it from */
    function listItem(item) {
        return (
            <Link to={`/menu/${item}`} className="link">
                <ListItem component="div" disablePadding button={true}>
                    <span className="header">{`${item}`}</span>
                </ListItem>
            </Link>
        );
    }

    return (
        <div className="home">
            <Navbar />
            <div>
                <h4 className="moreSpace">{`View Dining Courts!`}</h4><h6>(click to view info)</h6>
                <Box sx={{ width: '100%', height: 180, maxWidth: 360, bgcolor: 'background.paper' }} className="list">
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
                            <MenuItem value={1}>Dining Courts Having Items Matching My Prefs & Rests</MenuItem>
                            <MenuItem value={2}>Choose Custom Preferences & Restrictions</MenuItem>
                            <MenuItem value={3}>{`All Dining Courts`}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={"Sort Alphabetically"} checked={shouldSort} onChange={handleSortClick} />
                    </FormGroup>
                </Box>
            </div>
            <div className="filter">
                {
                    view == "SelectPrefs" && (
                        <>
                            <h4 className="space">{`Submit the Prefs/Rests You Want!`}</h4><h6>(then the items will update)</h6>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={VEGETARIAN} checked={vegetarian} onChange={handleVegetarian} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={VEGAN} checked={vegan} onChange={handleVegan} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={COCONUT + " free"} checked={coconut} onChange={handleCoconut} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={EGGS + " free"} checked={eggs} onChange={handleEggs} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={FISH + " free"} checked={fish} onChange={handleFish} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={GLUTEN + " free"} checked={gluten} onChange={handleGluten} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={SESAME + " free"} checked={sesame} onChange={handleSesame} />
                            </FormGroup>
                        </>
                    )
                }
            </div>
            <div className="filter2">
                {
                    view == "SelectPrefs" && (
                        <>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={SHELLFISH + " free"} checked={shellfish} onChange={handleShellfish} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={SOY + " free"} checked={soy} onChange={handleSoy} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={TREE_NUTS + " free"} checked={treeNuts} onChange={handleTreeNuts} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={WHEAT + " free"} checked={wheat} onChange={handleWheat} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={MILK + " free"} checked={milk} onChange={handleMilk} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={PEANUTS + " free"} checked={peanuts} onChange={handlePeanuts} />
                            </FormGroup>
                            <Button onClick={handleSelectPrefsClick} variant="contained" endIcon={<ArrowUpwardIcon />} className="moreSpace">Submit</Button>
                        </>

                    )
                }
            </div>
            {/* <Footer /> */}
        </div>
    );

};

export default Home;

/* Old home page */

// import Navbar from "../../components/navbar/Navbar";
// import Featured from "./featured/Featured";
// import "./home.scss";
// import List from "./list/List";
// import Footer from "../../components/footer/Footer";

// const Home = () => {
//   return (
//     <div className="home">
//       <Navbar/>
//       <Featured/>
//       <List title={"Recommended For You"}/>
//       <List title={"Recommended For You"}/>
//       <Footer/>
//     </div>
//   );
// };

// export default Home;