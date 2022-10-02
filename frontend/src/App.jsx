/* App.jsx - root component of react app, top most component in hierarchy */
import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const App = () => {
    return <Home />;
};

export default App;