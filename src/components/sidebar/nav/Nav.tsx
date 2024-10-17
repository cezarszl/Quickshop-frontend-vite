import { NavLink, useLocation } from "react-router-dom";
import styles from "./nav.module.css"; // Zmiana na import stylów jako obiekt

interface NavItem {
  name: string;
  path: string;
}

const Nav: React.FC = () => {
  const location = useLocation();

  const menuItems: NavItem[] = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "CART", path: "/cart" },
    { name: "CHECKOUT", path: "/checkout" },
  ];

  return (
    <div className={styles.navContainer}>
      <ul className={styles.menuList}>
        {menuItems.map((item: NavItem) => (
          <li key={item.name} className={styles.menuItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuLink} ${isActive ? styles.active : ""}`
              }
            >
              {item.name}
              <span
                className={`${styles.activeIndicator} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              ></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
