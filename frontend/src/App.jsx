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
                {/* take user to register page unless they are logged in. If they're logged in take them to home*/}
                <Route exact path="/" element={user ? <Home /> : <Navigate to="/register" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                { // paths for when logged in
                    user && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/settings" element={<Settings />} />
                        </>
                    )
                }
            </Routes>
        </Router>
    );
};

export default App;