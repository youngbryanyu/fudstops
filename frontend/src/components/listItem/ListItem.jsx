// ListItem.jsx - list item on a movie list
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import { useState } from "react";
import "./listItem.scss"

export default function ListItem({index}) {
    const [isHovered, setIsHovered] = useState(false); // whether hovering over list item
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
    return (
        <div 
            className="listItem" 
            style={{left: isHovered && index * 225 - 50 + index * 2.5}} // TODO: fix alignment math
            onMouseEnter={()=>setIsHovered(true)} 
            onMouseLeave={()=>setIsHovered(false)}
        >
            <img 
                // src="https://media-exp1.licdn.com/dms/image/C5603AQEkRAgsiHax8A/profile-displayphoto-shrink_800_800/0/1649278831747?e=1669852800&v=beta&t=6AJ54Hf4pEmLsAfJkPF3G0mqauZIopyGDXRoUYfPKNY"
                src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee" 
                alt="" 
            />
            {isHovered && ( // play video when hovering over list item
                <>
                    <video src={trailer} autoPlay={true} muted loop /> {/* need muted field when autoplaying on chrome */}
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon"/>
                            <Add className="icon"/>
                            <ThumbUpAltOutlined className="icon"/>
                            <ThumbDownOutlined className="icon"/>
                        </div>
                        <div className="itemInfoTop">
                            <span>1 hour 14 mins</span>
                            <span className="limit">16+</span>
                            <span>1999</span>
                        </div>
                        <div className="desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Hic tempore, mollitia quis molestiae beatae voluptas alias.
                        </div>
                        <div className="genre">Action</div>
                    </div>
                </>
            )}
        </div>
    );
}
