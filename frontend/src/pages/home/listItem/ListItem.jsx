// JS for a menu list item
import "./listItem.scss";
import {
    ThumbUpAltOutlined,
    ThumbDownOutlined,
    FavoriteBorder,
    Info,
} from "@material-ui/icons";
import { useState, useEffect } from 'react';

export default function ListItem({ index, isScrollingLeft, isScrollingRight }) {
    const { height, width } = useWindowDimensions();
    const [isHovered, setIsHovered] = useState(false);
    const trailer =
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
    
    // const handleHoverRight = (isScrollingLeft, isScrollingRight) => {
    //     if (isScrollingLeft || isScrollingRight) {
    //         setIsHovered(false); // don't want to hover and expand items while scrolling
    //     } else {
    //         setIsHovered(true);
    //     }
    // }
    
    return (
        <div
            className="listItem"
            style={{ left: isHovered && (index * ((width - 100)/4 - 5) - 50 + index * 5) + 50 }} // styling for when enlarged, based off of listItem.css size
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src="https://restaurantclicks.com/wp-content/uploads/2021/06/Clsoe-up-of-nigiri-sushi-on-plate.jpg"
                alt=""
            />
            {isHovered && (
                <>
                    <video src={trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <Info className="icon" />
                            <FavoriteBorder className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>Food Item Name</span>
                        </div>
                        <div className="desc">Food Item Description</div>
                        <div className="tags">Dietary Tags: Vegan, Kosher, etc</div>
                    </div>
                </>
            )}
        </div>
    );
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

