// featured menu item panel under the navbar
import { InfoOutlined, LocalDining } from "@material-ui/icons";
import "./featured.scss";

export default function Featured({ type }) {
    return (
        <div className="featured">
            <img
                src="https://restaurantclicks.com/wp-content/uploads/2021/06/Clsoe-up-of-nigiri-sushi-on-plate.jpg"
                alt=""
            />
            <div className="info">
                <span className="featuredTitle">Today's Featured Menu Item</span>
                <span className="foodItemName">Food Item Name</span>
                <span className="desc">
                    Featured food item description: Lorem ipsum dolor sit, amet consectetur 
                    adipisicing elit. Quia exercitationem nemo necessitatibus rem quasi qui molestiae facilis commodi
                    at molestias voluptas, sequi mollitia numquam, distinctio dolores recusandae aliquid omnis ullam.
                </span>
                <div className="buttons">
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                    <button className="diningCourt">
                        <LocalDining />
                        <span>Dining Court Name</span>
                    </button>
                </div>
            </div>
        </div>
    );
};