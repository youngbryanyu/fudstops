// JS for settings page
import Navbar from "../../components/navbar/Navbar";
import Featured from "../home/featured/Featured";
import "./settings.scss";
import Footer from "../../components/footer/Footer";

const Settings = () => {
  return (
    <div className="settings">
      <Navbar/>
      <Featured /> {/* placeholder */}
      <Footer/>
    </div>
  );
};

export default Settings;