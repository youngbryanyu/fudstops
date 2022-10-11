// Javascript for page displaying menu items for a dining court
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./menu.scss";
import { Link } from "react-router-dom";
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
        <div className="menu">
            <Navbar />
            <div className="section1">
                <div className="menuSection">
                    <span>Section 1</span>
                    <div className="menuItems">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section2">
                <div className="menuSection2">
                    <span>Section 2</span>
                    <div className="menuItems2">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section3">
                <div className="menuSection3">
                    <span>Section 3</span>
                    <div className="menuItems3">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section4">
                <div className="menuSection4">
                    <span>Section 4</span>
                    <div className="menuItems4">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section5">
                <div className="menuSection5">
                     <span>Section 5</span>
                    <div className="menuItems5">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section6">
                <div className="menuSection6">
                    <span>Section 6</span>
                    <div className="menuItems6">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section7">
                <div className="menuSection7">
                    <span>Section 7</span>
                    <div className="menuItems7">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section8">
                <div className="menuSection8">
                    <span>Section 8</span>
                    <div className="menuItems8">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section9">
                <div className="menuSection9">
                    <span>Section 9</span>
                    <div className="menuItems9">
                        <Link to="" className="link">
                            <span className="highlight">Item 1</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 2</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Item 3</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="days">
                <div className="left">
                    <div className="daysDropdown">
                        <span>Menu Days ▾</span>
                        <div className="daysDropdownOptions">
                            <Link to="/menu" className="link">
                                <span className="highlight">October 1</span>
                            </Link>
                            <Link to="/menu" className="link">
                                <span className="highlight">October 2</span>
                            </Link>
                            <Link to="/menu" className="link">
                                <span className="highlight">October 3</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="timing">
                <div className="left">
                    <div className="timingDropdown">
                        <span>Times ▾</span>
                        <div className="timingDropdownOptions">
                            <Link to="/menu" className="link">
                                <span className="highlight">Breakfast</span>
                            </Link>
                            <Link to="/menu" className="link">
                                <span className="highlight">Lunch</span>
                            </Link>
                            <Link to="/menu" className="link">
                                <span className="highlight">Dinner</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;