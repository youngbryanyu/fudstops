// JS for settings page
import Navbar from "../../components/navbar/Navbar";
import "../location/location.scss";
import "../menu/menu.scss";
import Footer from "../../components/footer/Footer";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Preferences = () => {

    let url = "https://cff2.earth.com/uploads/2018/10/18192727/What-determines-our-food-preferences-and-decisions.jpg";

    return (
        <div className="home">
            <Navbar />
            <div className="location"> 

                <img
                    src={url}
                    alt=""
                />

                <Grid container rowSpacing={10} columnSpacing={{ xs: 10, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <div className="info">
                                <Box className="box"><span className="boxHeader">{"Preferences Page"}</span></Box>
                                <Box className="box"><span className="boxDesc">{"Edit Your Dietary Preferences & Restrictions!"}</span></Box> 
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div className="info2">
                                <FormGroup>
                                    <Box className="box"><span className="boxHeader">{"Preferences"}</span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Vegetarian" />
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Vegan" />
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>
                        
                        <Grid item xs={1}>
                            <div className="info3-1">
                                <FormGroup  >
                                    <Box className="box"><span className="boxHeader">{"Restrictions"}</span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Coconut"/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Eggs"/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Fish"/>
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Gluten"/>   
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>

                        <Grid item xs={1}>
                            <div className="info4">
                                <FormGroup  >
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Sesame"  /> 
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Shellfish"  />
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Soy"  />
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Tree Nuts"  />
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>

                        <Grid item xs={1} className="info5">
                            <div className="pr-5">
                                <FormGroup  >
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Wheat"  />
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Milk"/>   
                                    </span></Box>
                                    <Box className="box"><span className="boxHeader2">
                                        <FormControlLabel control={<Checkbox />} label="Peanuts"  />  
                                    </span></Box>
                                </FormGroup>
                            </div>
                        </Grid>

                </Grid>
                
            </div>
            <Footer />
        </div>
    );
};

export default Preferences;