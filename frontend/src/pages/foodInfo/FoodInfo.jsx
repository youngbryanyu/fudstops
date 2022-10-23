// Javascript for page displaying info related to a menu item
// import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./foodInfo.scss";
import { Link } from "react-router-dom";

const FoodInfo = () => {
    return (
        <div className="foodInfo">
            <Navbar />
            <div className="nutrition">
                <div className="nutrtionFacts">
                    <div className="header">
                    <span>Nutrtion Facts for: Specific Menu Item</span>
                    </div>
                    <div className="nutritionItems">
                        <Link to="" className="link">
                            <span className="highlight">Serving Size: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Calories: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Carbs: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Fat: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Protien: </span>
                        </Link>
                    </div>
                </div>
                <div className="percent">
                    <span>* Percent Daily Values are based on a 2,000 calorie diet.</span>
                </div>
            </div>
            <div className="dietaryTags">
                <div className="tags">
                    <div className="header">
                        <span>Dietary Tags</span>
                    </div>
                    <div className="tagNames">
                        <Link to="" className="link">
                            <span className="highlight">Gluten</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Soy</span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Vegan</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="upcomingMeals">
                <div className="meals">
                    <div className="header">
                        <span>Upcoming Meals</span>
                    </div>
                    <div className="mealLocation">
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                        <Link to="" className="link">
                            <span className="highlight">Date & Location: </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="ingredients">
                <div className="ingredientHeader">
                    <span>Ingredients</span>
                </div>
                    <span> Enriched Flour (Unbleached Wheat Flour, Malted Barley Flour, Reduced Iron, Thiamine Mononitrate (Vitamin B1),
                     Riboflavin (Vitamin B2), Niacin (Vitamin B3), Folic Acid), Water, High Fructose Corn Syrup, 
                     Yeast, Soybean Oil, Wheat Gluten, Salt, Calcium Propionate (A Preservative), Monoglycerides, Vinegar,
                      Sodium Stearoyl Lactylate, Calcium Sulfate, Citric Acid, Ascorbic Acid.
                    </span>
           </div>
           <div className="disclaimer">
                <div className="disclaimerHeader">
                    <span>Disclaimer</span>
                </div>
                    <span> 
                        Menus subject to change. All nutritional information is based on the listed menu items. 
                        Any additions to ingredients or condiments will change the nutritional value. All information provided is believed to be accurate and reliable as of the date of posting.
                        Nutritional information may vary by location due to product substitutions or product availability.
                    </span>
            </div>
        </div>
    );
};

export default FoodInfo;