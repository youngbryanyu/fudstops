// Javascript for page displaying info related to a menu item
// import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./foodInfo.scss";
import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

const FoodInfo = () => {

    const [starClick1, setStarClick1] = useState(false);
    const [starClick2, setStarClick2] = useState(false);
    const [starClick3, setStarClick3] = useState(false);
    const [starClick4, setStarClick4] = useState(false);
    const [starClick5, setStarClick5] = useState(false);
    const [score, setScore] = useState(0);
    const [avg, setAvg] = useState("N/A");
    const { user } = useContext(AuthContext);
    let { menuItemID } = useParams(); //this will be undefined if no params
    const [menuItem, setMenuItem] = useState({});

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

    /**
    * Load initial ratings & get item on page render
    */
    const isFirstRenderRatings = useRef(true); // don't do anything on first render
    useEffect(() => {
        // Get initial rating then set rating of this item to that
        const setInitialRating = async () => {
            try {
                const response = await axios.get('/ratings/' + user.username + '/' + menuItemID);
                let rating = response.data;

                if(rating === "No doc found") { //means no rating for this item

                    //leave all stars blank
                    handleClick0();

                } else { //find rating and call respective function

                    rating = response.data.rating;

                    switch(rating) {

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
                if(rating != null) setAvg(rating);

            } catch ( error) { console.log(error) };

        };

        const getMenuItemInfo = async () => {

            try {

                const response = await axios.get(`/menuInfo/item/${menuItemID}`);
                const item = response.data;
                setMenuItem(item);

            } catch ( error) { console.log(error) };

        };

        if (isFirstRenderRatings.current) {
            if(menuItemID != null) {
                setInitialRating();
                getIntialAvgRating();
                getMenuItemInfo();
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

        if(menuItemID != null) updateRatingInDB(); // update the preferences in the database
        // eslint-disable-next-line

    }, [score]);

    return (
        <div className="foodInfo">
            <Navbar />
            <div className="nutrition">
                <div className="nutritionFacts">
                    <div className="header">
                    <span>{`Nutrtion Facts for: ${menuItem.name}`}</span>
                    </div>
                    <div className="nutritionItems">
                        <Link to="" className="link">
                            <span className="highlight">Serving Size: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Calories: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Carbs: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Fat: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Protein: </span>
                        </Link>
                    </div>
                </div>
                <div className="percent">
                    <span>* Percent Daily Values are based on a 2,000 calorie diet.</span>
                </div>
            </div>
            <div className="dietaryTags">
                <div className="tags">
                    <div className="header">
                        <span>Dietary Tags</span>
                    </div>
                    <div className="tagNames">
                        <Link to="" className="link">
                            <span className="highlight">Gluten</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Soy</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Vegan</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="ratings">
                <div className="tags">
                    <div className="header">
                        <span>Rate This Item!</span>
                    </div>
                    <div className="tagNames">
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
                    </div>
                </div>
            </div>
            <div className="upcomingMeals">
                <div className="meals">
                    <div className="header">
                        <span>Upcoming Meals</span>
                    </div>
                    <div className="mealLocation">
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="ingredients">
                <div className="ingredientHeader">
                    <span>Ingredients</span>
                </div>
                    <span> Enriched Flour (Unbleached Wheat Flour, Malted Barley Flour, Reduced Iron, Thiamine Mononitrate (Vitamin B1),
                     Riboflavin (Vitamin B2), Niacin (Vitamin B3), Folic Acid), Water, High Fructose Corn Syrup, 
                     Yeast, Soybean Oil, Wheat Gluten, Salt, Calcium Propionate (A Preservative), Monoglycerides, Vinegar,
                      Sodium Stearoyl Lactylate, Calcium Sulfate, Citric Acid, Ascorbic Acid.
                    </span>
           </div>
           <div className="disclaimer">
                <div className="disclaimerHeader">
                    <span>Disclaimer</span>
                </div>
                    <span> 
                        Menus subject to change. All nutritional information is based on the listed menu items. 
                        Any additions to ingredients or condiments will change the nutritional value. All information provided is believed to be accurate and reliable as of the date of posting.
                        Nutritional information may vary by location due to product substitutions or product availability.
                    </span>
            </div>
        </div>
    );
};

export default FoodInfo;