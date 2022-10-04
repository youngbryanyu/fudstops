// Javascript for home page
import Navbar from "../../components/navbar/Navbar";
import Featured from "./featured/Featured";
import "./home.scss";
import List from "./list/List";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <Featured/>
      <List/>
      <List/>
      <Footer/>
    </div>
  );
};

export default Home;