// Javascript for page displaying menu items for a dining court
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Location from "../location/Location";
import "./menu.scss";
import List from "../home/list/List";
import ListItem from "../home/listItem/ListItem";

const Menu = () => {

    let {location}  = useParams();
    let url = "";
    let description = "";
    let station = "";
    console.log(location);

    if(location === "Windsor") {
        url = "https://www.purdue.edu/uns/images/+2007/windsor-award.jpg";
        station = "CHELSEA GARDEN";
        description = "Windsor offers a relaxed dining atmosphere that fuses a generous sampling of dishes from around the world. This is your chance to be adventurous and try something new!"
    } else if(location === "Wiley") {
        url = "http://www.scholer.com/images/portfolio/education/colleges_universities/pu_wl/wiley_dining/0510-21.jpg";
        station = "ROMEO & PARMESAN";
        description = "The alluring scent of wood-smoked meats, the piquant spike of garlic and the sweet aroma of cookies baking greet you as you walk in the door."
    } else if(location === "Ford") {
        url = "https://www.purdue.edu/uns/images/+2004/johnson-ford.jpg";
        station = "POTĀTO, POTÄTO";
        description = "Ford's eight unique stations provide a variety of choices including New York style brick oven pizza, home-style American cuisine, and handmade desserts."
    } else if(location === "Earhart") {
        url = "https://static.wixstatic.com/media/bce2cf_36c73734b7bd49c0b99eb87833d207c1~mv2.jpg/v1/fill/w_480,h_360,al_c/bce2cf_36c73734b7bd49c0b99eb87833d207c1~mv2.jpg";
        station = "HEARTLAND CLASSICS";
        description = "Earhart Dining Court specializes in create your own stations. Swing by our Salad Stop station and create your own salad with an abundant variety of fresh salad mixes and crisp vegetables."
    } else if(location === "Hillenbrand") {
        url = "https://www.gannett-cdn.com/-mm-/c904f8af58b78747a2c7509ea24bded165bcf95b/c=0-305-4083-2612/local/-/media/2017/01/12/INGroup/LafayetteIN/636198371655976265-LAF-Purdue-student-death-01.jpg?width=1600&height=800&fit=crop&format=pjpg&auto=webp";
        station = "BIG BYTES";
        description = "Hillenbrand welcomes you to try our delicious globally-influenced offerings for lunch and dinner."
    }

    return (
        <div className="home">
            <Navbar />
            <Location locationName={location} imgURL={url} locationDescription={description} stationName={station}/> {/* placeholder */}
            <List title={"Today's Items"}/>
            <List title={"Popular Items"}/>
            <Footer />
        </div>
    );
};

export default Menu;