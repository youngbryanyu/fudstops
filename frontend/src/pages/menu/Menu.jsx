// Javascript for page displaying menu items for a dining court
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../home/featured/Featured";
import "./menu.scss";

const Menu = () => {
    return (
        <div className="home">
            <Navbar />
            <Featured /> {/* placeholder */}
            <Footer />
        </div>
    );
};

export default Menu;