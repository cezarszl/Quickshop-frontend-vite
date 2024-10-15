import logo from "@/assets/logo.png";
import { NavLink } from "react-router-dom";
import NavBar from "./nav/Nav";
import styles from "./sidebar.module.css"; // Upewnij się, że ten plik istnieje

const Sidebar = () => {
  return (
    <aside className={styles.sidebarContainer}>
      <NavLink to="">
        <img className={styles.sidebarLogo} src={logo} alt="QuickShop logo" />
      </NavLink>

      <div className={styles.navbarContainer}>
        <NavBar />
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.discountButton}> %Discount% </button>
        <button className={styles.newThisWeekButton}> New this week </button>
      </div>

      <div className={styles.bottomLinksContainer}>{/* <BottomLinks /> */}</div>

      <div className={styles.socialLinksContainer}>{/* <SocialLink /> */}</div>
    </aside>
  );
};

export default Sidebar;
