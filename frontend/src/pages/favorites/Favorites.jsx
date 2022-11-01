// Javascript for page displaying a user's favorite menu items
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./favorites.scss";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

const Favorites = () => {

    const [courtsMenu, setCourtsMenu] = useState([]); //the current items displayed in list
    const { user } = useContext(AuthContext);
    const username = user.username;

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

    /**
    * Load dining courts items on page load and alters anytime the location changes
    */
    useEffect(() => {

        const getSavedItems = async () => {

            try {
                const response = await axios.get(`/saved/allSaved/${username}`);
                const courtsItems = response.data;
                setCourtsMenu(courtsItems);

            } catch (error) { console.log(error) };

        };

        if (username != null) {
            getSavedItems();
        }

        // eslint-disable-next-line
    }, []);

    return (
        <div className="menu">
            <Navbar />
            <div>
                <h4 className="moreSpace">{`View Your Saved Items!`}</h4><h6>(click an item to see its info)</h6>
                <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }} className="list">
                    <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                        <List>
                            {courtsMenu.map((item) => listItem(item))}
                        </List>
                    </Paper>
                </Box>
            </div>
        </div>
    );
};

export default Favorites;