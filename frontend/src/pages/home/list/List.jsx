// Javascript for list of food items
import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useEffect } from "react";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List() {
    const [slideNumber, setSlideNumber] = useState(0);
    const { height, width } = useWindowDimensions();
    const MAX_NUM_SCROLLS = 6; // 10 items, 4 on screen at a time

    const listRef = useRef();

    const [isScrollingLeft, setIsScrollingLeft] = useState();
    const [isScrollingRight, setIsScrollingRight] = useState();

    const handleClick = (direction) => { // TODO: prevent button from being clicked multiple times in a row
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
            setIsScrollingLeft(true);
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${5 + ((width - 100)/4 - 5) + distance}px)`; // 5 + width / 5 is box size + margin
            setTimeout(() => {
                setIsScrollingLeft(false); // prevents double clicking on button
            }, 500); // half a second (b/c scroll takes half a second)
        }
        if (direction === "right" && slideNumber < MAX_NUM_SCROLLS) {
            setIsScrollingRight(true);
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-5 - ((width - 100)/4 - 5) + distance}px)`;
            setTimeout(() => {
                setIsScrollingRight(false); // prevents double clicking on button
            }, 500); // half a second (b/c scroll takes half a second)
        }
    };
    return (
        <div className="list">
            <span className="listTitle">Recommended for You</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: isScrollingLeft && "none"}} // if isScrollingLeft, display is none
                />
                <ArrowBackIosOutlined
                    className="sliderArrow left under"
                />
                <div className="listItems" ref={listRef}>
                    <ListItem index={0} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={1} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={2} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={3} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={4} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={5} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={6} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={7} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={8} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                    <ListItem index={9} isScrollingLeft={isScrollingLeft} isScrollingRight={isScrollingRight}/>
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                    style={{ display: isScrollingRight && "none"}} // if isScrollingRight, display is none
                />
                <ArrowForwardIosOutlined
                    className="sliderArrow right under"
                />
            </div>
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

