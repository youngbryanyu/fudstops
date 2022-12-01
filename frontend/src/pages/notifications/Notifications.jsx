import Navbar from "../../components/navbar/Navbar";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from "@material-ui/core";
import "../preferences/preferences.scss";

const Notifications = () => {

    const [optInRatingsNotify, setOptInRatings] = useState(false);
    const [optInSavedNotify, setOptInSaved] = useState(false);
    const [ratingsClicked, setRatingsClicked] = useState();
    const [savedClicked, setSavedClicked] = useState();
    const [phone, setPhone] = useState("");

    const { user } = useContext(AuthContext);

    const [notify, setNotify] = useState(true);

    const handleOptInRatings = () => {
        setOptInRatings(!optInRatingsNotify);
        setRatingsClicked(!ratingsClicked);
    }
    const handleOptInSaved = () => {
        setOptInSaved(!optInSavedNotify);
        setSavedClicked(!savedClicked);
    }

    const sendNotifyText = async (notification) => {

        try {

            console.log(notification);
            console.log(phone);

            const res = axios.post("/notify/text", {
                phoneNum: phone,
                text: notification
            });

        } catch (error) {
            console.log(error);
        }

    };

    const updateUser = async () => {

        try {
            
            const res = await axios.post("/notify/update", {
                username: user.username,
                optInRated: optInRatingsNotify,
                optInSaved: optInSavedNotify
            });

        } catch (err) {
            console.log(err);
        }

    };

    //this useEffect gets the most up to date user phone number
    const checkPhone = useRef(true);
    useEffect(() => {
        
        const updateUserInfo = async () => {

            try { 

                const res = await axios.get(`/users/find/${user._id}`);
                const data = res.data;
                setPhone(data.phone);
                setNotify(!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(data.phone))); //check if valid phone using regex

            } catch (error) { console.log(error) }

        }

        const getUserSelections = async () => {

            try {

                const res = await axios.get(`/notify/user/${user.username}`);
                console.log(res.data);
                const resOptInRatings = res.data.optInRated;
                const resOptInSaved = res.data.optInSaved;
                
                setOptInRatings(resOptInRatings);
                setOptInSaved(resOptInSaved);

            } catch (err) {
                console.log(err);
            } 

        };

        if (checkPhone.current) {
            updateUserInfo(); //checks if phone was updated
            getUserSelections(); //sets initial user selections
        }

        checkPhone.current = false;

    }, []);

    //this useEffect will call the appropriate endpoint that checks if any needed items are served today
    //it is activated when the checkboxes are clicked
    useEffect( () => {

        const ratedItems = async () => {

            try {

                const res = await axios.get(`/ratings/highlyRatedItems/${user.username}`);
                const ratedMenuItems = res.data;

                let message = [];

                ratedMenuItems.forEach( (item) => {

                    let courtData = item[0].courtData;
                    let courts = new Set();

                    courtData.forEach( (court) => {

                        courts.add(court[0]);

                    });

                    let courtsJoined = Array.from(courts).join(", ")

                    let string = `- ${item[0].name} served at ${courtsJoined}`;

                    message.push(string);

                });

                let introText = "Your favorite menu items are being served today! \r\n";
                let ratedText = message.join("\r\n");

                sendNotifyText(introText.concat(ratedText));

            } catch (error) {
                console.log(error);
            }

        }

        if(optInRatingsNotify) ratedItems();

    }, [ratingsClicked]);

    useEffect( () => {

        const savedItems = async () => {

            try {

                const res = await axios.get(`/recommendations/saved/${user.username}`);
                const prefsAndRestsObj = res.data;

                if(prefsAndRestsObj.message != "All Good!") {
                    sendNotifyText("Add more saved items!");
                    return;
                }

                const res2 = await axios.post("/menuInfo/prefsAndRests", {
                    restrictions: prefsAndRestsObj.restrictions,
                    preferences: prefsAndRestsObj.preferences
                });
                const savedItems = res2.data;
                console.log(savedItems);

                //first call /saved and get prefsAndRests object
                //then call /prefsAndRests
                //that gives all items you need to cycle thru
                //then finally done

                let message = [];
                let count = 0;
                
                for(let i = 0; i < Math.min(savedItems.length, 10); i++){

                    let item = savedItems[i];

                    let courtData = item.courtData;
                    let courts = new Set();

                    courtData.forEach( (court) => {

                        courts.add(court[0]);

                    });

                    let courtsJoined = Array.from(courts).join(", ")

                    let string = `- ${item.name} served at ${courtsJoined}`;

                    message.push(string);

                    count++;

                    if(count == 20) break;

                }

                let introText = "Food similar to your saved items are being served today! \r\n";
                let ratedText = message.join("\r\n");

                sendNotifyText(introText.concat(ratedText));

            } catch (error) {
                console.log(error);
            }

        }

        if(optInSavedNotify) savedItems();

    }, [savedClicked]);

    //update users selections in DB \
    const update = useRef(false);
    useEffect( () => {

        try {
            if(update.current) updateUser();

            update.current = true;
        } catch (error) {
            console.log(error);
        }

    }, [optInRatingsNotify, optInSavedNotify]);

    return (
        <div className="preferences">
            <Navbar />
            <Grid container rowSpacing={10} columnSpacing={{ xs: 10, sm: 2, md: 3 }}>
                <Grid item xs={2}>
                    <div className="about">
                        <Box className="box"><span className="header">Text Notifications</span></Box>
                        <Box className="box"><span className="boxCaption">{"Opt-In To Receive Text Notifications!"}</span></Box>
                        {
                            notify && (
                                <>
                                    <Box className="box"><span className="boxCaption">{"You Do Not Have A Valid Phone Number!"}</span></Box>
                                </>
                            )
                        }
                    </div>
                </Grid>

                <Grid item xs={3}>
                    <div className="info2">
                        <FormGroup>
                            <Box className="box"><span className="header">Highly Rated Items</span></Box>
                            <Box className="box">
                                <span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={"Opt-In Notifications"} checked={optInRatingsNotify} onChange={handleOptInRatings} disabled={notify} />
                                </span>
                            </Box>
                        </FormGroup>
                    </div>
                </Grid>

                <Grid item xs={1}>
                    <div className="info3-1">
                        <FormGroup  >
                            <Box className="box"><span className="header">Your Saved Items</span></Box>
                            <Box className="box">
                                <span className="boxHeader2">
                                    <FormControlLabel control={<Checkbox />} label={"Opt-In Notifications"} checked={optInSavedNotify} onChange={handleOptInSaved} disabled={notify} />
                                </span>
                            </Box>
                        </FormGroup>
                    </div>
                </Grid>

            </Grid>
            {/* <Footer /> */}
        </div>
    );

}

export default Notifications;