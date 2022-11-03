// Javascript for page displaying info related to a menu item
// import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./foodInfo.scss";
import { useContext, useState, useEffect, useRef } from 'react';
import { json, Link, useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { AuthContext } from "../../authContext/AuthContext";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/material/Box';
import axios from "axios";

const FoodInfo = () => {
    const [starClick1, setStarClick1] = useState(false);
    const [starClick2, setStarClick2] = useState(false);
    const [starClick3, setStarClick3] = useState(false);
    const [starClick4, setStarClick4] = useState(false);
    const [starClick5, setStarClick5] = useState(false);
    const [savedClick, setSavedClick] = useState(false);
    const [score, setScore] = useState(0); //tracks users rating of item
    const [avg, setAvg] = useState("N/A"); //tracks avg rating
    const [saved, setSaved] = useState(false); //whether or not item is saved
    const { user } = useContext(AuthContext);
    let { menuItemID } = useParams(); //this will be undefined if no params
    const [menuItem, setMenuItem] = useState({
        _id: "",
        ID: "",
        name: "",
        courtData: [],
        dateServed: "",
        isVegetarian: false,
        allergens: [],
        nutritionFacts: [],
        ingredients: "",
        __v: 0
    }); //tracks menu item

    const handleClick0 = () => {
        setStarClick1(false);
        setStarClick2(false);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
        setScore(0);
    }
    const handleClick1 = () => {
        setStarClick1(true);
        setStarClick2(false);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
        setScore(1);
    }
    const handleClick2 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
        setScore(2);
    }
    const handleClick3 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(false);
        setStarClick5(false);
        setScore(3);
    }
    const handleClick4 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(true);
        setStarClick5(false);
        setScore(4);
    }
    const handleClick5 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(true);
        setStarClick5(true);
        setScore(5);
    }
    const handleSavedClick = () => {
        setSavedClick(!savedClick);
    }

    /**
    * Load initial ratings & get item & get saved item on page render
    */
    const isFirstRenderRatings = useRef(true); // don't do anything on first render
    useEffect(() => {
        // Get initial rating then set rating of this item to that
        const setInitialRating = async () => {
            try {
                const response = await axios.get('/ratings/' + user.username + '/' + menuItemID);
                let rating = response.data;

                if (rating === "No doc found") { //means no rating for this item

                    //leave all stars blank
                    handleClick0();

                } else { //find rating and call respective function

                    rating = response.data.rating;

                    switch (rating) {
                        default:
                            handleClick0();
                            break;
                        case 1:
                            handleClick1();
                            break;
                        case 2:
                            handleClick2();
                            break;
                        case 3:
                            handleClick3();
                            break;
                        case 4:
                            handleClick4();
                            break;
                        case 5:
                            handleClick5();
                            break;

                    }

                }

            } catch (error) {
                console.log(error);
            }
        };

        const getIntialAvgRating = async () => {
            try {
                const response = await axios.get(`/ratings/${menuItemID}`);
                const rating = response.data.avgRating;
                if (rating != null) setAvg(rating);
            } catch (error) { console.log(error) };
        };

        const getMenuItemInfo = async () => {
            try {
                const response = await axios.get(`/menuInfo/item/${menuItemID}`);
                const item = response.data;
                setMenuItem({
                    _id: item._id,
                    ID: item.ID,
                    name: item.name,
                    courtData: item.courtData,
                    dateServed: item.dateServed,
                    isVegetarian: item.isVegetarian,
                    allergens: item.allergens,
                    nutritionFacts: item.nutritionFacts,
                    ingredients: item.ingredients,
                    __v: item.__v,
                })
                console.log(menuItem);
            } catch (error) { console.log(error) };

        };

        const getSavedStatus = async () => {
            try {
                const response = await axios.get(`/saved/${user.username}/${menuItemID}`);
                const savedStatus = response.data.saved;
                if (savedStatus != null) {
                    setSaved(savedStatus);
                    setSavedClick(savedStatus);
                }
            } catch (error) { console.log(error) };
        };

        if (isFirstRenderRatings.current) {
            if (menuItemID != null) {
                setInitialRating();
                getIntialAvgRating();
                getMenuItemInfo();
                getSavedStatus();
            }
        }
        isFirstRenderRatings.current = false;
        // eslint-disable-next-line
    }, []);

    /**
     * Update the rating in the database when rating changes, not on first render though. Triggered by useEffect above
     */
    const isFirstRender_updateRatingsDB = useRef(true); // don't do anything on first render
    useEffect(() => {
        if (isFirstRender_updateRatingsDB.current) {
            isFirstRender_updateRatingsDB.current = false;
            return; // don't update DB on initial render
        }

        const updateRatingInDB = async () => {
            try {
                await axios.post('/ratings', {
                    username: user.username,
                    menuItemID: menuItemID,
                    rating: score
                });
                console.log("successfully updated rating of menuItemId: " + menuItemID);
            } catch (error) {
                console.log("failed to update rating: " + error);
            }
        }

        if (menuItemID != null) {
            updateRatingInDB(); // update the preferences in the database
        }// eslint-disable-next-line

    }, [score]);

    const nutrition = menuItem.nutritionFacts.map((fact) =>
        <ListItem key="{fact.Name}">
            <Typography fontWeight="bold">
                {fact.Name}: &nbsp;
            </Typography>
            {fact.LabelValue}
        </ListItem>
    );

    const tags = menuItem.allergens.map((tag) =>
        <ListItem key="{tag.Name}">
            <Typography fontWeight="bold">
                {tag.Name}: &nbsp;
            </Typography>
            {String(tag.Value)}
        </ListItem>
    );

    /**
     * Update the savedStatus in the database when saved changes, not on first render though.
     */
    const isFirstRender_updateSavedDB = useRef(true); // don't do anything on first render
    useEffect(() => {
        if (isFirstRender_updateSavedDB.current) {
            isFirstRender_updateSavedDB.current = false;
            return; // don't update DB on initial render
        }

        const updateSavedStatusInDB = async () => {
            try {
                await axios.post('/saved', {
                    username: user.username,
                    menuItemID: menuItemID,
                    saved: savedClick
                });
                console.log("successfully updated savedStatus of menuItemId: " + menuItemID);
            } catch (error) {
                console.log("failed to update savedStatus: " + error);
            }
        }

        if (menuItemID != null) {
            updateSavedStatusInDB(); //update savedStatus of item in DB
        }// eslint-disable-next-line

    }, [savedClick]);
    
    return (
        <div className="foodInfo">
            <Navbar />
            <Sheet sx={{
                background: '#0b0b0b',
                width: .4,
                maxHeight: 400,
                position: 'relative',
                float: 'left',
                display: 'inline',
                ml: 6,
                top: 85,
                borderRadius: 10,
                overflow: 'auto',
            }}>
                <List>
                    <ListItem sx={{
                        background: '#242424',
                        width: .98,
                        mx: 'auto',
                        borderRadius: 8,
                    }}>
                        <Typography style={{ color: "#ebc034" }} fontWeight="bold">
                            Nutrition Facts for: &nbsp; {menuItem.name}
                        </Typography>
                    </ListItem>
                    {nutrition}
                </List>
            </Sheet>
            <Sheet sx={{
                background: '#0b0b0b',
                width: .2,
                maxHeight: 400,
                position: 'relative',
                float: 'left',
                display: 'inline',
                ml: 6,
                top: 85,
                borderRadius: 10,
                overflow: 'auto',
            }}>
                <List>
                    <ListItem sx={{
                        background: '#242424',
                        width: .98,
                        mx: 'auto',
                        borderRadius: 8,
                    }}>
                        <Typography fontWeight="bold">
                            Tags:
                        </Typography>
                    </ListItem>
                    {tags}

                </List>
            </Sheet>
            <Box sx={{
                background: '#0b0b0b',
                width: 340,
                height: 'auto',
                overflow: 'hidden', //do not remove, will break the ratings appearance and idk why
                position: 'absolute',
                ml: 6, //left margin (percent of screen)
                mt: 63, //top margin (percent of screen)
                borderRadius: 10,
            }}>
                <Tooltip title={`Average Rating: ${avg}`} placement="bottom">
                    <IconButton color="inherit">
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <IconButton color="inherit" onClick={handleClick1}>
                    {starClick1 ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={handleClick2}>
                    {starClick2 ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={handleClick3}>
                    {starClick3 ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={handleClick4}>
                    {starClick4 ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={handleClick5}>
                    {starClick5 ? <StarIcon /> : <StarOutlineIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={handleSavedClick}>
                    {savedClick ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </Box>
            <Box sx={{ ml: 6, mt: 70, width: .9, height: 'auto', position: 'absolute' }}>
                <Box sx={{
                    borderColor: '#242424',
                    p: 1,
                    m: 1,
                    borderRadius: 4,
                    border: '1px solid',
                    width: 1,
                    height: 'auto',
                    display: 'block',
                }}>
                    <Typography fontWeight="bold">
                        Ingredients: &nbsp;
                    </Typography>
                    {menuItem.ingredients}
                </Box>
                <Box sx={{
                    borderColor: '#242424',
                    p: 1,
                    m: 1,
                    borderRadius: 4,
                    border: '1px solid',
                    height: 'auto',
                    width: 1,
                    display: 'block',
                }}>
                    <Typography style={{ color: "#f74d40" }} fontWeight="bold" color='red'>
                        Disclaimer: &nbsp;
                    </Typography>
                    Menus subject to change. All nutritional information is based on the listed menu items. Any additions to ingredients or condiments will change the nutritional value. All information provided is believed to be accurate and reliable as of the date of posting. Nutritional information may vary by location due to product substitutions or product availability.
                </Box>
            </Box>
        </div>
    );
};



export default FoodInfo;