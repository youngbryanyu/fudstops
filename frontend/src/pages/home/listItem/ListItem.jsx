// JS for a menu list item
import "./listItem.scss";
import { useContext, useState, useEffect, useRef } from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import InfoIcon from '@material-ui/icons/Info';
import { AuthContext } from "../../../authContext/AuthContext";
import axios from "axios";

//when I press an item's rating, 
//(for example lets say I give menuItem 'pizza' a rating of 4 stars)
//(then I would axios.post body : {username, 'pizza', 4})

//on load of the page, I would get the ratings the user has given for each item on the page
//so I would axios.get with a body of {username, menuItemId} 
//and if I get a json response of "No doc found " then I will keep the stars all blank to indicate no rating
//otherwise I will take the response to display the correct amount of stars to display

export default function ListItem({ index, isScrollingLeft, isScrollingRight, menuItemIdParam }) {
    const { width } = useWindowDimensions();
    const [isHovered, setIsHovered] = useState(false);
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
    const { user } = useContext(AuthContext); // get user from auth context, can directly index into its fields

    const [starClick1, setStarClick1] = useState(false);
    const [starClick2, setStarClick2] = useState(false);
    const [starClick3, setStarClick3] = useState(false);
    const [starClick4, setStarClick4] = useState(false);
    const [starClick5, setStarClick5] = useState(false);
    const [score, setScore] = useState(0);
    const [avg, setAvg] = useState(0);

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
    * Load initial ratings on page render
    */
    const isFirstRenderRatings = useRef(true); // don't do anything on first render
    useEffect(() => {
        // Get initial rating then set rating of this item to that
        const setInitialRating = async () => {
            try {
                const response = await axios.get('/ratings/' + user.username + '/' + menuItemIdParam);
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

                const response = await axios.get(`/ratings/${menuItemIdParam}`);
                const rating = response.data.avgRating;
                setAvg(rating);

            } catch ( error) { console.log(error) };

        };

        if (isFirstRenderRatings.current) {
            if(menuItemIdParam != null) {
                setInitialRating();
                getIntialAvgRating();
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
                console.log(menuItemIdParam);
                await axios.post('/ratings', {
                    username: user.username,
                    menuItemID: menuItemIdParam,
                    rating: score
                });
                console.log("successfully updated rating of menuItemId: " + menuItemIdParam);
            } catch (error) {
                console.log("failed to update rating: " + error);
            }
        }

        if(menuItemIdParam != null) updateRatingInDB(); // update the preferences in the database
        // eslint-disable-next-line

    }, [score]);

    return (
        <div
            className="listItem"
            style={{ left: isHovered && (index * ((width - 100) / 4 - 5) - 50 + index * 5) + 50 }} // styling for when enlarged, based off of listItem.css size
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src="https://restaurantclicks.com/wp-content/uploads/2021/06/Clsoe-up-of-nigiri-sushi-on-plate.jpg"
                alt=""
            />
            {isHovered && (
                <>
                    <video src={trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">

                            <Tooltip title={`Average Rating: ${avg}`} placement="top-start">
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
                        <div className="itemInfoTop">
                            <span>Food Item Name</span>
                        </div>
                        <div className="desc">Food Item Description</div>
                        <div className="tags">Dietary Tags: Vegan, Kosher, etc</div>
                    </div>
                </>
            )}
        </div>
    );
};

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

