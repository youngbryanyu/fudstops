// Javascript for page displaying menu items for a dining court
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./menu.scss";

const Menu = () => {

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
            <Footer />
        </div>
    );
    
};

export default Menu;