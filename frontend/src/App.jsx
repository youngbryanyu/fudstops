/* App.jsx - root component of react app, top most component in hierarchy */
import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import FoodInfo from "./pages/foodInfo/FoodInfo";
import Menu from "./pages/menu/Menu";
import Settings from "./pages/settings/Settings";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Favorites from "./pages/favorites/Favorites";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
    const { user } = useContext(AuthContext); // get user from auth context

    return (
        <Router>
            <Routes>
                {/* user can only access other pages if logged in, and can't access login pages if logged in already */}
                { // paths for when logged in
                    user && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/foodInfo" element={<FoodInfo />} />
                            <Route path="/login" element={<Home />} /> {/* Should go to home when logged in */}
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/register" element={<Home />} /> {/* Should go to home when logged in */}
                            <Route path="/settings" element={<Settings />} />
                        </>
                    )
                }
                { // paths for when logged out - should redirect to register page if not logged in except for /login
                    !user && (
                        <>
                            <Route path="/" element={<Register />} />
                            <Route path="/favorites" element={<Register />} />
                            <Route path="/foodInfo" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/menu" element={<Register />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/settings" element={<Register />} />
                        </>
                    )
                }
            </Routes>
        </Router>
    );
};

export default App;