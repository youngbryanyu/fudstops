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
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../authContext/AuthContext";
import "./menu.scss";
import axios from "axios";
import { Mail, Phone, NearMe } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    root: {
        color: "black",
    },
    selected: {
        color: "white"
    }
}));

const Menu = () => {

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

    //states for number, email, and loc
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [loc, setLoc] = useState("");
    useEffect(() => {
        if (location == "Windsor") {
            setNumber("(765) 496-3905")
            setEmail("kbinge@purdue.edu")
            setLoc("205 North Russell Street West Lafayette, IN 47906")
        }
        if (location == "Wiley") {
            setNumber("(765) 494-2264")
            setEmail("cavanare@purdue.edu")
            setLoc("498 S Martin Jischke Drive West Lafayette, IN 47906")
        }
        if (location == "Ford") {
            setNumber("(765) 494-2482")
            setEmail("ahallmen@purdue.edu")
            setLoc("1122 West Stadium Avenue West Lafayette, IN 47906")
        }
        if (location == "Earhart") {
            setNumber("(765) 496-6925")
            setEmail("coryb@purdue.edu")
            setLoc("1275 1st Street West Lafayette, IN 47906")
        }
        if (location == "Hillenbrand") {
            setNumber("(765) 496-0461")
            setEmail("nmputubw@purdue.edu")
            setLoc("1301 3rd Street West Lafayette, IN 47906")
        }
        console.log(number);
        console.log(email);
        console.log(location);
    });





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
                const response = await axios.post(`/menuInfo/prefsAndRests/${location}`, {
                    preferences: prefs,
                    restrictions: rests
                });
                const courtsItems = response.data;
                setSelectedItems(courtsItems);
                setCourtsMenu(courtsItems);

            } catch (error) { console.log(error) };

        };

        getItemsFromSelections();

    }

    const handleChange = (event) => { //this is for handling the filters options

        if (event.target.value == 1) { //this means the user selected Items Matching My Prefs & Rests

            setView("MatchingItems");
            setCourtsMenu(matchingItems);

        } else if (event.target.value == 2) { //this means user wants to select from checkbox

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

        const getCourtsItems = async () => {

            try {
                const response = await axios.get(`/menuInfo/${location}`);
                const courtsItems = response.data;
                setCourtsMenu(courtsItems);
                setAllItems(courtsItems);

            } catch (error) { console.log(error) };

        };

        const getItemsMatchingUser = async () => {

            try {
                const response = await axios.get(`/menuInfo/prefs/${location}/${username}`);
                const courtsItems = response.data;
                setMatchingItems(courtsItems);

            } catch (error) { console.log(error) };

        };

        if (location != null) {
            getCourtsItems();
            getItemsMatchingUser();
        }

        // eslint-disable-next-line
    }, [location]);


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
                <h4 className="moreSpace">{`View ${location}'s Items!`}</h4><h6>(click to view info)</h6>
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
                            <MenuItem value={1}>Items Matching My Prefs & Rests</MenuItem>
                            <MenuItem value={2}>Choose Custom Preferences & Restrictions</MenuItem>
                            <MenuItem value={3}>{`All ${location}'s Items`}</MenuItem>
                        </Select>
                    </FormControl>
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

                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={COCONUT} checked={coconut} onChange={handleCoconut} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={EGGS} checked={eggs} onChange={handleEggs} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={FISH} checked={fish} onChange={handleFish} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={GLUTEN} checked={gluten} onChange={handleGluten} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={SESAME} checked={sesame} onChange={handleSesame} />

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

                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={SHELLFISH} checked={shellfish} onChange={handleShellfish} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={SOY} checked={soy} onChange={handleSoy} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={TREE_NUTS} checked={treeNuts} onChange={handleTreeNuts} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={WHEAT} checked={wheat} onChange={handleWheat} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={MILK} checked={milk} onChange={handleMilk} />
                                <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={PEANUTS} checked={peanuts} onChange={handlePeanuts} />

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
            <span className="contactInfo">
                    <span className="number"> <Phone className="icon" />  {number} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                    <span className="email"> <Mail className="icon" /> {email} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                    <span className="location"> <NearMe className="icon" /> {loc} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
            </span>
        </div>
        
    );

};

export default Menu;