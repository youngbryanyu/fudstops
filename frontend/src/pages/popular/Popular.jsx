// Javascript for page displaying menu items for a dining court
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from 'react';
import "./popular.scss";
import axios from "axios";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';

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
        if (rating == 0) {
            return (<> (No Ratings)</>
            )
        }
        if (rating == 1) {
            return (<>
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (rating == 2) {
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (rating == 3) {
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (rating == 4) {
            return (<>
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarIcon color="inherit" />
                <StarOutlineIcon color="inherit" />
            </>
            )
        }
        if (rating == 5) {
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
                <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }} className="list">
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