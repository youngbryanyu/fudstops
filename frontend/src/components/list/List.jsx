// List.jsx - javascript for movie list
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons"
import { useRef, useState } from "react"
import ListItem from "../listItem/ListItem"
import "./list.scss"

export default function List() {
    // const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef() // for referencing the list of movies container

    const handleClick = (direction) => { // for handling clicking on arrows (scrolling)
        // setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50 // gets current x-distance from left border (-50 because of left margin)
        if (direction === "left" && slideNumber > 0) { // TODO: fix clicking on arrows mid scroll
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`; // scroll left
        }
        if (direction === "right" && slideNumber < 5) { // TODO: adjust slide number value for different sized screens
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`; // scroll right
        }
    }
    return (
        <div className="list">
            <span className="listTitle">Continue to watch</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left" 
                    onClick={()=>handleClick("left")}
                    // style={{display: !isMoved && "none"}} // left arrow doesn't appear until scrolled
                />
                <div className="container" ref={listRef}> {/* list of movies container*/}
                    <ListItem index={0}/>
                    <ListItem index={1}/>
                    <ListItem index={2}/>
                    <ListItem index={3}/>
                    <ListItem index={4}/>
                    <ListItem index={5}/>
                    <ListItem index={6}/>
                    <ListItem index={7}/>
                    <ListItem index={8}/>
                    <ListItem index={9}/>
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>handleClick("right")}/>
            </div>
        </div>
    )
}
