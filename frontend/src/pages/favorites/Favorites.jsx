// Javascript for page displaying a user's favorite menu items
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import "./favorites.scss";

const Favorites = () => {
    return (
        <div className="favorites">
            <Navbar />
            <div className="left">
                <div className="favoriteDropdown">
                    <div className="favoritedItems">
                        <Link to="" className="link">
                            <span className="highlight">Bread</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Eggs</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Cake</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Cookie</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Ketchup</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Mustard</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Pizza</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Pasta</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Burgers</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Steak</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Turkey</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Butter Chicken</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">General Tsos</span>
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div className="displayFacts">
                         <div className="facts">
                            <span className="highlight">Display food information</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;