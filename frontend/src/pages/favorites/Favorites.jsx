// Javascript for page displaying a user's favorite menu items
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./favorites.scss";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Favorites = () => {

    const [courtsMenu, setCourtsMenu] = useState([]); //the current items displayed in list
    const [menuBeforeSort, setMenuBeforeSort] = useState([]); // items displayed before sorting (courtsmenu)
    const [shouldSort, setShouldSort] = useState(false);
    const { user } = useContext(AuthContext);
    const username = user.username;

    const loading = useRef(true); /* whether items are loading */

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

    /* sorting */
    const handleSortClick = () => {
        setShouldSort(!shouldSort);
    }

    /**
    * Load dining courts items on page load and alters anytime the location changes
    */
    useEffect(() => {
        const getSavedItems = async () => {
            try {
                const response = await axios.get(`/saved/allSaved/${username}`);
                const courtsItems = response.data;
                loading.current = false /* not loading anymore after items are loaded */
                setCourtsMenu(courtsItems);
            } catch (error) { 
                loading.current = false /* not loading anymore after items are loaded */
                setCourtsMenu([]);
                console.log(error);
            };
        };

        if (username != null) {
            getSavedItems();
        }

        // eslint-disable-next-line
    }, []);

    //console.log(courtsMenu.length);

    /* Sorting useEffect */
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current === true) {
            isFirstRender.current = false;
            return;
        }
        // sort courts menu then set it to the sorted
        if (shouldSort) {
            //this does a copy of the prior menu
            setMenuBeforeSort(JSON.parse(JSON.stringify(courtsMenu))); //unsorted items now stored in menuBeforeSort
            //now we sort the item (this is an inline function that compares two objects names)
            //this means (if a's name > b's name) then return 1
            //            else return (if b's name > a's name) then 1 
            //                         else return 0 which means both names are equal
            courtsMenu.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        } else if (!shouldSort) {
            //set courtsMenu back to the way it was originally
            setCourtsMenu(menuBeforeSort);
        }
        // eslint-disable-next-line
    }, [shouldSort]);

    return (
        <div className="favorites">
            <Navbar />
            <div className="items">
                <h4 className="moreSpace">{`Your favorite items:`}</h4>
                {/* <h6>(click an item to see its info)</h6> */}
                <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper', borderRadius: 5 }} className="list">
                    <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                        {
                            loading.current ? (
                                <List>
                                    <ListItem component="div" disablePadding button={true}>
                                        <span className="header">{"Loading..."}</span>
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
                                            <span className="header">{"No favorite items."}</span>
                                        </ListItem>
                                    </List>
                                )
                            )
                        }

                    </Paper>
                </Box>
                <FormGroup className="checkbox">
                    <FormControlLabel control={<Checkbox size="small" color="secondary" />} label={"Sort Alphabetically"} checked={shouldSort} onChange={handleSortClick} />
                </FormGroup>
            </div>
        </div>
    );
};

export default Favorites;