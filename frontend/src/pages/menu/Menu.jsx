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
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import Navbar from "../../components/navbar/Navbar";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import "./menu.scss";
import axios from "axios";
import { Mail, Phone, NearMe } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
  },
  selected: {
    color: "white",
  },
}));

const Menu = () => {
  const classes = useStyles();
  let { location } = useParams();
  const [meal, setMeal] = useState("");
  const [allItems, setAllItems] = useState([]); //keep track of all menu items
  const [selectedItems, setSelectedItems] = useState([]); //keep track of the selected checkbox items
  const [courtsMenu, setCourtsMenu] = useState([]); // the current items displayed in list
  const [times, setTimes] = useState([]); //the current times in the list
  const [matchingItems, setMatchingItems] = useState([]); //keep track of matching user's prefs items
  const [view, setView] = useState(""); //keep track of which filterconst [] option is currently chosen
  const { user } = useContext(AuthContext);
  const [shouldSort, setShouldSort] = useState(false);
  const [menuBeforeSort, setMenuBeforeSort] = useState([]); // items displayed before sorting (courtsmenu)

  const [shouldSortPop, setShouldSortPop] = useState(false); //should sort based ff item popularity

  const [menuBeforeSortPop, setMenuBeforeSortPop] = useState([]); // sort the menu items based on the rating

  const [disableSort, setDisableSort] = useState(false); //disabling the button when the other one is in use
  const [disableSortPop, setDisableSortPop] = useState(false); //disabling the button when the other one is in use

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

  // states for number, email, and loc
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loc, setLoc] = useState("");

  // dining court names
  const WINDSOR = "Windsor";
  const WILEY = "Wiley";
  const FORD = "Ford";
  const EARHART = "Earhart";
  const HILLENBRAND = "Hillenbrand";

  const WINDSOR_ADDR =
    "https://www.google.com/maps/place/Windsor+Dining+Court/@40.4270199,-86.9227636,17z/data=!3m1!4b1!4m5!3m4!1s0x8812e2b5c166c8cb:0xc6b89b5c96b567c4!8m2!3d40.4270158!4d-86.9205696";
  const WILEY_ADDR =
    "https://www.google.com/maps/place/Wiley+Dining+Court,+500+S+Martin+Jischke+Dr,+West+Lafayette,+IN+47906/@40.4270199,-86.9227636,17z/data=!4m5!3m4!1s0x8812e2b5a74ea24f:0x73a56c71f42b5191!8m2!3d40.4285229!4d-86.9207974";
  const FORD_ADDR =
    "https://www.google.com/maps/place/Ford+Dining+Court/@40.432113,-86.9217514,17z/data=!3m1!4b1!4m5!3m4!1s0x8812fd4b26db4177:0x2f3f9ae6b45d3924!8m2!3d40.4321076!4d-86.9193754";
  const EARHART_ADDR =
    "https://www.google.com/maps/place/Earhart+Dining+Court/@40.432113,-86.9217514,17z/data=!4m5!3m4!1s0x8812fddb980c7891:0xbe31985e92758c5a!8m2!3d40.4256049!4d-86.9251085";
  const HILLENBRAND_ADDR =
    "https://www.google.com/maps/place/Hillenbrand+Dining+Court/@40.4265725,-86.9290621,17z/data=!3m1!4b1!4m5!3m4!1s0x8812e2cbef5b238b:0xf6c8203c74b1aa90!8m2!3d40.4270003!4d-86.9266448";

  /* handle clicking on address of dining court --> redirect to external link*/
  const handleClickLocation = () => {
    if (location === WINDSOR) {
      window.open(WINDSOR_ADDR, "_blank");
    }
    if (location === WILEY) {
      window.open(WILEY_ADDR, "_blank");
    }
    if (location === FORD) {
      window.open(FORD_ADDR, "_blank");
    }
    if (location === EARHART) {
      window.open(EARHART_ADDR, "_blank");
    }
    if (location === HILLENBRAND) {
      window.open(HILLENBRAND_ADDR, "_blank");
    }
  };

  /* set correct dining court info when location changes */
  useEffect(() => {
    if (location === WINDSOR) {
      setNumber("(765) 496-3905");
      setEmail("kbinge@purdue.edu");
      setLoc("205 North Russell Street West Lafayette, IN 47906");
    }
    if (location === WILEY) {
      setNumber("(765) 494-2264");
      setEmail("cavanare@purdue.edu");
      setLoc("498 S Martin Jischke Drive West Lafayette, IN 47906");
    }
    if (location === FORD) {
      setNumber("(765) 494-2482");
      setEmail("ahallmen@purdue.edu");
      setLoc("1122 West Stadium Avenue West Lafayette, IN 47906");
    }
    if (location === EARHART) {
      setNumber("(765) 496-6925");
      setEmail("coryb@purdue.edu");
      setLoc("1275 1st Street West Lafayette, IN 47906");
    }
    if (location === HILLENBRAND) {
      setNumber("(765) 496-0461");
      setEmail("nmputubw@purdue.edu");
      setLoc("1301 3rd Street West Lafayette, IN 47906");
    }
  }, [location]);

  /* sorting */
  const handleSortClick = () => {
    setShouldSort(!shouldSort);
  };

  const handleSortClickPop = () => {
    setShouldSortPop(!shouldSortPop);
  };

  /*disable the sorting button*/
  const handleSortDisable = () => {
    setDisableSort(!disableSort);
  };

  const handleSortDisablePop = () => {
    setDisableSortPop(!disableSortPop);
  };

  /* Sorting useEffect */
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }
    // sort courts menu then set it to the sorted
    if (shouldSort) {
      setDisableSortPop(true);
      //this does a copy of the prior menu
      setMenuBeforeSort(JSON.parse(JSON.stringify(courtsMenu))); //unsorted items now stored in menuBeforeSort
      //now we sort the item (this is an inline function that compares two objects names)
      //this means (if a's name > b's name) then return 1
      //            else return (if b's name > a's name) then 1
      //                         else return 0 which means both names are equal
      courtsMenu.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    } else if (!shouldSort) {
      setDisableSortPop(false);
      //set courtsMenu back to the way it was originally
      setCourtsMenu(menuBeforeSort);
    }
    // eslint-disable-next-line
  }, [shouldSort]);

  /*Sort by rating(popular items) */
  const isFirstRenderPop = useRef(true);
  useEffect(() => {
    if (isFirstRenderPop.current === true) {
      isFirstRenderPop.current = false;
      return;
    }
    // sort courts menu then set it to the sorted
    if (shouldSortPop) {
      setDisableSort(true);
      setMenuBeforeSortPop(JSON.parse(JSON.stringify(courtsMenu)));
      courtsMenu.sort((a, b) =>
        a.avgRating < b.avgRating ? 1 : b.avgRating < a.avgRating ? -1 : 0
      ); //make the most highly rated items appear at the top of the list
    } else if (!shouldSortPop) {
      setDisableSort(false);
      setCourtsMenu(menuBeforeSortPop);
    }
    // eslint-disable-next-line
  }, [shouldSortPop]);

  console.log(courtsMenu);

  /* selecting preferences and restrictions from checkbox */
  const handleSelectPrefsClick = () => {
    //this is for handling the submit button of preferences
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
        const response = await axios.post(
          `/menuInfo/prefsAndRests/${location}`,
          {
            preferences: prefs,
            restrictions: rests,
          }
        );
        const courtsItems = response.data;
        setSelectedItems(courtsItems);
        setCourtsMenu(courtsItems);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsFromSelections();
  };

  const handleChange = (event) => {
    //this is for handling the filters options
    if (event.target.value === 1) {
      //this means the user wants to view all items
      setView("AllItems");
      setCourtsMenu(allItems);
    } else if (event.target.value === 2) {
      //this means user wants to select from checkbox
      setView("SelectPrefs");
      setCourtsMenu(selectedItems);
    } else if (event.target.value === 3) {
      //this means the user selected Items Matching My Prefs & Rests
      setView("MatchingItems");
      setCourtsMenu(matchingItems);
      console.log(matchingItems);
    }
  };

  const handleMeals = (event) => {
    //this is for handling the meal selection options
    if (event.target.value === 1) {
      setMeal("Breakfast");
    } else if (event.target.value === 2) {
      setMeal("Brunch");
    } else if (event.target.value === 3) {
      setMeal("Lunch");
    } else if (event.target.value === 4) {
      setMeal("Late-Lunch");
    } else if (event.target.value === 5) {
      setMeal("Dinner");
    }
  };

  /**
   * Load dining courts items on page load and alters anytime the location changes (when user first enters the page)
   */
  useEffect(() => {
    const getCourtsItems = async () => {
      try {
        const response = await axios.get(`/menuInfo/${location}`);
        const courtsItems = response.data;
        setCourtsMenu(courtsItems);
        setAllItems(courtsItems);
      } catch (error) {
        console.log(error);
      }
    };

    const getItemsMatchingUser = async () => {
      try {
        const response = await axios.get(
          `/menuInfo/prefs/${location}/${username}`
        );
        const courtsItems = response.data;
        console.log("courts items is");
        setMatchingItems(courtsItems);
      } catch (error) {
        console.log(error);
      }
    };

    const getTimes = async () => {
      try {
        const response = await axios.get(`/menuInfo/courts/${location}`);
        const courtInfo = response.data;
        setTimes(courtInfo.mealInfo);
      } catch (error) {
        console.log(error);
      }
    };

    if (location !== null) {
      setCourtsMenu([]); //this is to set the menu to blank (to clear the prior stuff while loading)
      getCourtsItems();
      getTimes();
      getItemsMatchingUser();
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    const getItemsMatchingMeal = async () => {
      try {
        const response = await axios.get(`/menuInfo/meals/${location}/${meal}`);
        const data = response.data;
        setCourtsMenu(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (meal !== null) {
      setCourtsMenu([]); //this is to set the menu to blank (to clear the prior stuff while loading)
      getItemsMatchingMeal();
    }
    // eslint-disable-next-line
  }, [meal]);

  function listTimes(time) {
    const type = time.mealType;
    const start = time.start;
    const end = time.end;

    return (
      <ListItem component="div" disablePadding button={true}>
        <span className="header">{`${type}: ${start} to ${end}`}</span>
      </ListItem>
    );
  }

  function listItem(item) {
    //display a menu item
    const name = item.name;
    const id = item.ID;
    return (
      <Link to={`/foodInfo/${id}`} className="link">
        <ListItem component="div" disablePadding button={true}>
          <span className="header">{`${name}`}</span>
        </ListItem>
      </Link>
    );
  }

  // prototype for displaying a default message for if there is no response for a meal
  // function displayMenu(menu) {
  //     if(!menu) {
  //         return (
  //             <ListItem component="div" disablePadding button={true}>
  //                 <span className="header">{`${location}`} is not serving {`${meal}`}</span>
  //             </ListItem>
  //         )
  //     } else {
  //         menu.map((item) => listItem(item))
  //     }
  // }
  return (
    <div className="menu">
      <Navbar />
      <div>
        <h4 className="moreSpace">{`${location}'s full menu:`}</h4>
        <h6>(click to view info)</h6>
        <Box
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          className="list"
        >
          <Paper style={{ maxHeight: 400, overflow: "auto" }}>
            <List>{courtsMenu.map((item) => listItem(item))}</List>
          </Paper>
        </Box>
      </div>
      <div className="menuTimes">
        <h4 className="evenMoreSpace">{`${location}'s meal times:`}</h4>
        <Box
          sx={{ height: 400, width: 200, bgcolor: "Black" }}
          className="times"
        >
          <Paper style={{ height: 400, overflow: "auto" }}>
            <List>{times.map((time) => listTimes(time))}</List>
          </Paper>
        </Box>
      </div>
      <div className="filter">
        <h4>Apply filters:</h4>
        <h6>(click to view options)</h6>
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
              <MenuItem value={1}>{`View ${location}'s Full Menu`}</MenuItem>
              <MenuItem value={2}>
                Select Custom Preferences & Restrictions
              </MenuItem>
              <MenuItem value={3}>
                Items Matching My Preferences & Restrictions
              </MenuItem>
            </Select>
          </FormControl>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" color="secondary" />}
              label={"Sort Alphabetically"}
              checked={shouldSort}
              onChange={handleSortClick}
              disabled={disableSort}
            />
            <FormControlLabel
              control={<Checkbox size="small" color="secondary" />}
              label={"Sort by Item Popularity"}
              checked={shouldSortPop}
              onChange={handleSortClickPop}
              disabled={disableSortPop}
            />
          </FormGroup>
        </Box>
      </div>
      <div className="filter">
        <h4>Select Meals:</h4>
        <h6>(click to view options)</h6>
        <Box sx={{ minWidth: 120 }}>
          <FormControl error fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Filters</InputLabel>
            <Select
              id="demo-simple-select"
              value={meal}
              label="Filter"
              onChange={handleMeals}
              classes={{ root: classes.root, select: classes.selected }}
            >
              <MenuItem
                value={1}
              >{`View ${location}'s Breakfast Menu`}</MenuItem>
              <MenuItem value={2}>{`View ${location}'s Brunch Menu`}</MenuItem>
              <MenuItem value={3}>{`View ${location}'s Lunch Menu`}</MenuItem>
              <MenuItem
                value={4}
              >{`View ${location}'s Late Lunch Menu`}</MenuItem>
              <MenuItem value={5}>{`View ${location}'s Dinner Menu`}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="filter">
        {view === "SelectPrefs" && (
          <>
            <h4 className="space">{`Input your restrictions and preferences:`}</h4>
            <h6>(menu will update after submitting)</h6>
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
        {view === "SelectPrefs" && (
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
            <Button
              onClick={handleSelectPrefsClick}
              variant="contained"
              endIcon={<ArrowUpwardIcon />}
              className="moreSpace"
            >
              Submit
            </Button>
          </>
        )}
      </div>
      <span className="contactInfo">
        <span className="number">
          {" "}
          <Phone className="icon" /> {number}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="email">
          {" "}
          <Mail className="icon" /> {email}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </span>
        <span className="location" onClick={handleClickLocation}>
          {" "}
          <NearMe className="icon" /> {loc}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </span>
      </span>
    </div>
  );
};

export default Menu;
