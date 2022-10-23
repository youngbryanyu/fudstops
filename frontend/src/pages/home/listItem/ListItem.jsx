// JS for a menu list item
import "./listItem.scss";
import { useState, useEffect } from 'react';
import { IconButton } from "@material-ui/core";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import InfoIcon from '@material-ui/icons/Info';

export default function ListItem({ index, isScrollingLeft, isScrollingRight }) {
    const { width } = useWindowDimensions();
    const [isHovered, setIsHovered] = useState(false);
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
    
    const [starClick1, setStarClick1] = useState(false);
    const [starClick2, setStarClick2] = useState(false);
    const [starClick3, setStarClick3] = useState(false);
    const [starClick4, setStarClick4] = useState(false);
    const [starClick5, setStarClick5] = useState(false);

    const handleClick1 = () => {
        setStarClick1(true);
        setStarClick2(false);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
    }
    const handleClick2 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
    }
    const handleClick3 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(false);
        setStarClick5(false);
    }
    const handleClick4 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(true);
        setStarClick5(false);
    }
    const handleClick5 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(true);
        setStarClick5(true);
    }

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
                            <IconButton color="inherit">
                                <InfoIcon />
                            </IconButton>
                            <IconButton color="inherit" onClick={handleClick1}>
                                {starClick1 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                            <IconButton color="inherit" onClick={handleClick2}>
                                {starClick2 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                            <IconButton color="inherit" onClick={handleClick3}>
                                {starClick3 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                            <IconButton color="inherit" onClick={handleClick4}>
                                {starClick4 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                            <IconButton color="inherit" onClick={handleClick5}>
                                {starClick5 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
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

