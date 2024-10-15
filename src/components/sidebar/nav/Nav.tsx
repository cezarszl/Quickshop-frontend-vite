import { NavLink } from "react-router-dom";
import styles from "./nav.module.css"; // Zmiana na import stylów jako obiekt

interface NavItem {
  name: string;
  path: string;
}

export default function Nav() {
  const menuItems: NavItem[] = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "CART", path: "/cart" },
    { name: "CHECKOUT", path: "/checkout" },
  ];

  return (
    <div className={styles.navContainer}>
      {" "}
      {/* Zastosowanie klas z obiektu styles */}
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
                  item.path === "/shop" ? styles.active : ""
                }`}
              ></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
