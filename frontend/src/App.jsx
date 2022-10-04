/* App.jsx - root component of react app, top most component in hierarchy */
import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import FoodInfo from "./pages/foodInfo/FoodInfo"; 
import Menu from "./pages/menu/Menu";

const App = () => {
  return <Home />;
};

export default App;