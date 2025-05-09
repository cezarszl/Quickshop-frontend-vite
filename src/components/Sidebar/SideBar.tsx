import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import NavBar from "./nav/Nav";
import styles from "./sidebar.module.css"; // Upewnij się, że ten plik istnieje
import BottomLinks from "./bottomLinks/BottomLinks";
// import SocialLink from "./socialLinks/SocialLink";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebarContainer}>
      <NavLink to="">
        <img className={styles.sidebarLogo} src={logo} alt="QuickShop logo" />
      </NavLink>

      <div className={styles.navbarContainer}>
        <NavBar />
      </div>

      <div className={styles.buttonContainer}>
        {/* <button className={styles.discountButton}> %Discount% </button> */}
        <Link to="/new-this-week">
          <button className={styles.newThisWeekButton}> New this week </button>
        </Link>
      </div>

      <BottomLinks />
    </aside>
  );
};

export default Sidebar;
