// Javascript for page displaying a user's favorite menu items
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../home/featured/Featured";
import "./favorites.scss";

const Favorites = () => {
    return (
        <div className="home">
            <Navbar />
            <Featured /> {/* placeholder */}
            <Footer />
        </div>
    );
};

export default Favorites;