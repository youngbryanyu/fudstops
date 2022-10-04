// Javascript for page displaying info related to a menu item
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../home/featured/Featured";
import "./foodInfo.scss";

const FoodInfo = () => {
    return (
        <div className="home">
            <Navbar />
            <Featured /> {/* placeholder */}
            <Footer />
        </div>
    );
};

export default FoodInfo;