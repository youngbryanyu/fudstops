// Javascript for page displaying menu items for a dining court
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./menu.scss";
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { useParams, Link } from "react-router-dom";
import {useState, useEffect, useRef} from 'react';
import axios from "axios";

const Menu = () => {

    let { location } = useParams();
    const [courtsMenu, setCourtsMenu] = useState([]);

    /**
    * Load dining courts items on page load and alters anytime the location changes
    */
    useEffect(() => {

        const getCourtsItems = async () => {

            try {
                const response = await axios.get(`/menuInfo/${location}`);
                const courtsItems = response.data;
                setCourtsMenu(courtsItems);

            } catch (error) { console.log(error) };

        };

        if (location != null) {
            getCourtsItems();
        }

        // eslint-disable-next-line
    }, [location]);

    function listItem(item) {
        const name = item.name;
        const id = item.ID

        return (
            <ListItem component="div" disablePadding button={true}>
                <Link to={`/foodInfo/${id}`} className="link">
                    <span className="header">{`${name}`}</span>
                </Link>
            </ListItem>
        );
    }

    return (
        <div className="menu">
            <Navbar />
            <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }} className="list">
                <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                    <h4>{`View ${location}'s Items!`}</h4>
                    <List>
                        {courtsMenu.map((item) => listItem(item))}
                    </List>
                </Paper>
            </Box>

            {/* <Footer /> */}
        </div>
    );

};

export default Menu;