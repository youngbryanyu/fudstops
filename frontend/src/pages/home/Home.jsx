/* Home.jsx - main javascript file for home page */
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import Navbar from "../../components/navbar/Navbar"
import "./home.scss"

const Home = () => {
    return (
        <div className='home'>
            <Navbar /> {/* navigation at top */}
            <Featured /> {/* featured panel */}
            <List /> {/* lists of movies */}
            <List />
            <List />
            <List />
        </div>
    )  
}

export default Home