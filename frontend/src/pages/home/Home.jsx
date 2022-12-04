// Javascript for home page

// Javascript for page displaying menu items for a dining court
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import Button from "@material-ui/core/Button";
import Navbar from "../../components/navbar/Navbar";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import "./home.scss";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete /* , {  createFilterOptions  } */ from "@mui/material/Autocomplete";

/* dining court constants*/
const DINING_COURTS = ["Wiley", "Earhart", "Ford", "Hillenbrand", "Windsor"];

/* filter type constants */
const ALL_ITEMS = 0;
const USERS_PREFS = 1;
const MATCHING_ITEMS = 2;


/* styling for text */
const useStyles = makeStyles((theme) => ({
    root: {
        color: "black",
    },
    selected: {
        color: "white",
    },
}));

const Home = () => {
    const classes = useStyles();
    let { location } = useParams();
    const [courtsMenu, setCourtsMenu] = useState(DINING_COURTS); /* current items displayed in UI */
    const [allItems, setAllItems] = useState([]); /* keep cache of all items (items are dining courts) */
    const [matchingItems, setMatchingItems] = useState([]); /* keep cache of matching user's prefs items */
    const [selectedItems, setSelectedItems] = useState([]); /* keep track of the selected checkbox items */
    const [view, setView] = useState(ALL_ITEMS); /* keep track of which filter option is currently chosen */
    console.log(courtsMenu)
    console.log("const: " + DINING_COURTS)

    const { user } = useContext(AuthContext); /* content for user */
    let username = user.username;

    const loading = useRef(true); /* whether something in the page is loading */

    const [fullMenu, setFullMenu] = useState([]); /* keep track of full menu (for dietary prefs checking) */

    /* preferences */
    const VEGAN = "Vegan";
    const VEGETARIAN = "Vegetarian";

    /* restrictions */
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

    /* preference flags for checkboxes */
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);

    /* restriction flags for checkboxes */
    const [coconut, setCoconut] = useState(false);
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

    /* returns whether no checkboxes are selected */
    function noCheckBoxesSelected() {
        return (!vegetarian && !vegan && !coconut && !eggs && !fish && !gluten && !sesame
            && !shellfish && !soy && !treeNuts && !wheat && !milk && !peanuts);
    }

    let prefs = [];
    let rests = [];

    /* handlers for toggling checkboxes */
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

    /* sorting */
    const [shouldSort, setShouldSort] = useState(false);
    const [menuBeforeSort, setMenuBeforeSort] = useState([]);
    const handleSortClick = () => {
        setShouldSort(!shouldSort);
    };

    /* alphabetical sorting */
    
    useEffect(() => {
        if (shouldSort) {
            setMenuBeforeSort(JSON.parse(JSON.stringify(courtsMenu)));
            courtsMenu.sort();
        } else {
            setCourtsMenu(menuBeforeSort);
        }
    }, [shouldSort]);

    /* get all dining courts */
    const getAllDiningCourts = async () => {
        /* if all dining courts are already cached */
        if (allItems.length !== 0) {
            return;
        }
        try {
            loading.current = false;
            setAllItems(JSON.parse(JSON.stringify(courtsMenu)));
            setCourtsMenu(JSON.parse(JSON.stringify(courtsMenu)));
        } catch (error) {
            console.log(error);
        }
    };

    /* get all menu items */
    const getFullMenu = async () => {
        /* if menu items are already cached */
        if (fullMenu.length !== 0) {
            return;
        }
        try {
            const response = await axios.get(`/menuInfo/all`);
            const courtsItems = response.data;
            // console.log(response.data);
            loading.current = false;
            setFullMenu(courtsItems);
        } catch (error) {
            console.log(error);
        }
    };

    /* get only items matching user preferences */
    const getItemsMatchingUser = async () => {
        /* if matching items are already cached */
        if (matchingItems.length !== 0) {
            return;
        }

        try {
            const matchingCourts = [];
            // post for each dining court
            for (let diningCourt of DINING_COURTS) {
                const response = await axios.get(
                    `/menuInfo/prefs/${diningCourt}/${username}`
                );
                const courtsItems = response.data;
                if (courtsItems.length > 0) {
                    // if more than 0 dining items match from the dining court, push it to the dining courts list
                    matchingCourts.push(diningCourt);
                    console.log(
                        "Items from " +
                        diningCourt +
                        " that match prefs/rests is " +
                        courtsItems.length
                    );
                } else {
                    console.log(diningCourt + " has no match");
                }
            }
            loading.current = false; /* done loading */
            setMatchingItems(matchingCourts);
        } catch (error) {
            console.log(error);
        }
    };

    /* runs when user tries to select custom preferences */
    const handleSelectPrefsClick = async () => {
        // this is for handling the submit button of preferences
        loading.current = true;
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
                    const response = await axios.post(
                        `/menuInfo/prefsAndRests/${diningCourt}`,
                        {
                            preferences: prefs,
                            restrictions: rests,
                        }
                    );
                    const courtsItems = response.data;
                    if (courtsItems.length > 0) {
                        // if more than 0 dining items match from the dining court, push it to the dining courts list
                        matchingCourts.push(diningCourt);
                        console.log(
                            "Items from " +
                            diningCourt +
                            " that match prefs/rests is " +
                            courtsItems.length
                        );
                    } else {
                        console.log(diningCourt + " has no items match prefs/rests");
                    }
                }

                // set dining courts to those that have items that match selected dietary preferences in filter menu
                loading.current = false;
                setSelectedItems(matchingCourts);
                setCourtsMenu(matchingCourts);
            } catch (error) {
                console.log(error);
            }
        };

        getItemsFromSelections();
    };

    /* handle filter selection change */
    const handleChange = (event) => {
        // this is for handling the filters options
        if (event.target.value === USERS_PREFS) { /* match users pref/rests */
            /* loading not needed b/c of cache */
            setView(USERS_PREFS);
            setCourtsMenu(matchingItems);
        } else if (event.target.value === MATCHING_ITEMS) { /* select custom prefs/rests*/
            loading.current = true; /* loading */
            setView(MATCHING_ITEMS);
            setCourtsMenu(selectedItems);
        } else if (event.target.value === ALL_ITEMS) { /* all menus */
            /* loading not needed b/c of cache */
            setView(ALL_ITEMS);
            setCourtsMenu(allItems);
        }
    };

    /* set menu before sorting each time something updates */
    useEffect(() => {
        setMenuBeforeSort(JSON.parse(JSON.stringify(courtsMenu)));
    }, [courtsMenu]);

    /* useEffect for handling selecting items */
    useEffect(() => {
        if (view === USERS_PREFS) {
            getItemsMatchingUser();
        } else if (view === MATCHING_ITEMS) {
            handleSelectPrefsClick();
        } else if (view === ALL_ITEMS) {
            getFullMenu();
        }
    }, [view]);

    /**
     * Load dining courts items on page load and alters anytime the location changes
     * also load up an array with every menu item for use in the searchbar
     */
    useEffect(() => {
        loading.current = true;
        getItemsMatchingUser();
        getAllDiningCourts(); // get all dining courts after b/c we want to show all dining courts
        getFullMenu();
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

    const navigate = useNavigate();
    // searchbar component. cannot search for just any value, have to select from dropdown
    // params: current menu state (pass in courtsMenu)
    function Searchbar(menu) {
        function handleInputChange(event, value) {
            if (!value) {
                return;
            }
            if (value.ID) {
                console.log(value.ID);
                navigate("/foodInfo/" + value.ID);
            }
        }

        /* the key ensures that search results are accurate */
        const renderOptions = (props: React.HTMLAttributes<HTMLElement>, option: Partial<any>) => { /* ignore the red underlines */
            return <li {...props} key={option.ID}>{option.name}</li>
        }
        return (
            <Box>
                <Autocomplete
                    disablePortal
                    autoComplete={true}
                    autoHighlight={true}
                    id="menu-search-bar"
                    options={menu}
                    getOptionLabel={(option) => option.name}
                    onChange={handleInputChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Search for a menu item" />
                    )}
                    renderOption={renderOptions}
                    sx={{
                        pt: "5px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "White",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "White",
                        },
                        "& .MuiOutlinedInput-input": {
                            color: "White",
                        },
                        "& .MuiInputLabel-outlined": {
                            color: "White",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "White",
                        },
                        "&.Mui-focused .MuiInputLabel-outlined": {
                            color: "White",
                        },
                    }}
                />
            </Box>
        );
    }
    // exported jsx
    return (
        <div className="home">
            <Navbar />
            <Stack spacing={2}>
                <div className="stackedFilter">
                    {/* <h4>Search all menus items :</h4> */}
                    {Searchbar(fullMenu)}
                </div>
                <Stack spacing={2} direction="row">
                    <div className="stackedFilter">
                        <h4>{`Dining courts:`}</h4>
                        {/* <h6>(click to view info)</h6> */}
                        <Box
                            sx={{
                                width: "100%",
                                maxHeight: 200,
                                maxWidth: 360,
                                bgcolor: "background.paper",
                                borderRadius: 5
                            }}
                            className="list"
                        >
                            <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                                {
                                    loading.current ? (
                                        <List>
                                            <ListItem component="div" disablePadding button={true}>
                                                <span className="header">{"Loading..."}</span>
                                            </ListItem>
                                        </List>
                                    ) : (
                                        view === MATCHING_ITEMS && noCheckBoxesSelected() ? (
                                            <List>
                                                <ListItem component="div" disablePadding button={true}>
                                                    <span className="header">{"Select some preferences/restrictions."}</span>
                                                </ListItem>
                                            </List>
                                        ) : (
                                            courtsMenu.length !== 0 ? (
                                                <List>
                                                    {courtsMenu.map((item) => listItem(item))}
                                                </List>
                                            ) : (
                                                <List>
                                                    <ListItem component="div" disablePadding button={true}>
                                                        <span className="header">{"No dining courts open today."}</span>
                                                    </ListItem>
                                                </List>
                                            )
                                        )
                                    )
                                }
                            </Paper>
                        </Box>
                    </div>
                    <div className="stackedFilter">
                        {/* <h4>Select filter: </h4> */}
                        {/* <h6>(click to open options)</h6> */}
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl error fullWidth sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel>Filters</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={view}
                                    label="Filter"
                                    onChange={handleChange}
                                    classes={{ root: classes.root, select: classes.selected }}
                                >
                                    <MenuItem value={ALL_ITEMS}>All dining courts</MenuItem>
                                    <MenuItem value={USERS_PREFS}>
                                        Dining courts satisfying my preferences/restrictions
                                    </MenuItem>
                                    <MenuItem value={MATCHING_ITEMS}>Custom preferences/restrictions</MenuItem>
                                </Select>
                            </FormControl>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox size="small" color="secondary" />}
                                    label={"Sort Alphabetically"}
                                    checked={shouldSort}
                                    onChange={handleSortClick}
                                />
                            </FormGroup>
                        </Box>
                    </div>
                </Stack>
            </Stack>
            <div className="filter">
                {view === MATCHING_ITEMS && (
                    <>
                        <h4 className="space">{`Select custom preferences and restrictions:`}</h4>
                        {/* <h6>(submit to see updates)</h6> */}
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={VEGETARIAN}
                                checked={vegetarian}
                                onChange={handleVegetarian}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={VEGAN}
                                checked={vegan}
                                onChange={handleVegan}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={COCONUT + " free"}
                                checked={coconut}
                                onChange={handleCoconut}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={EGGS + " free"}
                                checked={eggs}
                                onChange={handleEggs}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={FISH + " free"}
                                checked={fish}
                                onChange={handleFish}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={GLUTEN + " free"}
                                checked={gluten}
                                onChange={handleGluten}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={SESAME + " free"}
                                checked={sesame}
                                onChange={handleSesame}
                            />
                        </FormGroup>
                    </>
                )}
            </div>
            <div className="filter2">
                {view === MATCHING_ITEMS && (
                    <>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={SHELLFISH + " free"}
                                checked={shellfish}
                                onChange={handleShellfish}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={SOY + " free"}
                                checked={soy}
                                onChange={handleSoy}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={TREE_NUTS + " free"}
                                checked={treeNuts}
                                onChange={handleTreeNuts}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={WHEAT + " free"}
                                checked={wheat}
                                onChange={handleWheat}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={MILK + " free"}
                                checked={milk}
                                onChange={handleMilk}
                            />
                            <FormControlLabel
                                control={<Checkbox size="small" color="secondary" />}
                                label={PEANUTS + " free"}
                                checked={peanuts}
                                onChange={handlePeanuts}
                            />
                        </FormGroup>
                        {/* <Button
                            onClick={handleSelectPrefsClick}
                            variant="contained"
                            endIcon={<ArrowUpwardIcon />}
                            className="moreSpace"
                        >
                            Submit
                        </Button> */}
                    </>
                )}
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
