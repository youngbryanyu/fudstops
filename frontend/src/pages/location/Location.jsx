// featured menu item panel under the navbar
import "./location.scss";
import Box from "@material-ui/core/Box";

//later on, 
//Location will query database for imgURL, menu items (including their images), 
//locationDescription, and station names
//it will do this using the name provided to it

export default function Location( props ) { //locationName, imgURL, locationDescription, stationName
    return (
        <div className="location">
            <img
                src={props.imgURL}
                alt=""
            />
            <div className="info">
                <Box className="box"><span className="boxHeader">{props.locationName}</span></Box>
                <Box className="box"><span className="boxCaption">Get it fresh from {props.locationName}'s {props.stationName}!</span></Box>
                <Box className="box"><span className="boxDesc">{props.locationDescription}</span></Box> 
            </div>
        </div>
    );
};