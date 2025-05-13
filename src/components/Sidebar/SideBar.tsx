import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import NavBar from "./nav/Nav";
import styles from "./sidebar.module.css";
import BottomLinks from "./bottomLinks/BottomLinks";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(`.${styles.sidebarContainer}`);
      if (isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`${styles.sidebarContainer} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <NavLink to="/" className={styles.logoLink}>
            <img
              className={styles.sidebarLogo}
              src={logo}
              alt="QuickShop logo"
            />
          </NavLink>
        </div>

        <div className={styles.navbarContainer}>
          <NavBar />
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/new-this-week" className={styles.promoLink}>
            <button className={styles.newThisWeekButton}>
              <ShoppingBag size={16} />
              <span>New this week</span>
            </button>
          </Link>
        </div>

        <div className={styles.sidebarFooter}>
          <BottomLinks />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
