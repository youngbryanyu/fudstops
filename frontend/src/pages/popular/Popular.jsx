// Javascript for page displaying menu items for a dining court
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./popular.scss";
import axios from "axios";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import { StarHalf } from "@material-ui/icons";

const Popular = () => {

    const [popularItems, setpopularItems] = useState([]); // the current items displayed in list
    const [existsPopularItems, setExistsPopularItems] = useState(true); // whether any items exist above the popular threshold
    /**
    * Load dining courts items on page load and alters anytime the location changes (when user first enters the page)
    */
    useEffect(() => {
        const getCourtsItems = async () => {
            try {
                const response = await axios.get(`/menuInfo/popular`);
                if (response.data.length === 0) {
                    setExistsPopularItems(false);
                }
                const courtsItems = response.data;
                setpopularItems(courtsItems);
            } catch (error) { console.log(error) };
        };

        setpopularItems([]); // this is to set the menu to blank (to clear the prior stuff while loading)
        getCourtsItems();

        // eslint-disable-next-line
    }, [location]);

    /* return the proper number of stars for a menu item */
    function getStars(rating) {
        if (rating === 0) {
            return (<> (No Ratings)</>
            )
        }
        if (0 < rating && rating <= .75) { // .5 star
            return (<>
                <StarHalf color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (.75 < rating && rating <= 1.25) { // 1 star
            return (<>
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (1.25 < rating && rating <= 1.75) { // 1.5 star
            return (<>
                <StarIcon color="inherit" />
                <StarHalf color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (1.75 < rating && rating <= 2.25) { // 2 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (2.25 < rating && rating <= 2.75) { // 2.5 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarHalf color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (2.75 < rating && rating <= 3.25) { // 3 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (3.25 < rating && rating <= 3.75) { // 3.5 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarHalf color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (3.75 < rating && rating <= 4.25) { // 4 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (4.25 < rating && rating <= 4.75) { // 4.5 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarHalf color="inherit" />
            </>
            )
        }
        if (4.75 < rating && rating <= 5) { // 5 star
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
            </>
            )
        }
    }

    function listItem(item) { //display a menu item
        const name = item.name;
        const id = item.ID
        const avgRating = item.avgRating;
        return (
            <Link to={`/foodInfo/${id}`} className="link">
                <ListItem component="div" button={true}>
                    <span className="stars">{getStars(avgRating)}</span>
                    <span>{`\t - ${name}`} </span>
                </ListItem>
            </Link>
        );
    }

    return (
        <div className="menu">
            <Navbar />
            <div>
                <h4 className="moreSpace">{`Popular Items Today:`}</h4><h6>(click to view info)</h6>
                <Box sx={{ width: '100%', height: 400, maxWidth: 1000, bgcolor: 'background.paper' }} className="list">
                    <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                        <List>
                            {existsPopularItems ? (
                                popularItems.map((item) => listItem(item))
                            ) : (
                                <ListItem component="div" button={true}>
                                    <span>No popular items today</span>
                                </ListItem>
                            )
                            }
                        </List>
                    </Paper>
                </Box>
            </div>
        </div>

    );
};


export default Popular;