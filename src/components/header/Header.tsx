import React from "react";
import styles from "./header.module.css";
import { FaCheck, FaUser } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useCartStore } from "@/store/cartStore";

const Header: React.FC = () => {
  const { totalQuantity } = useCartStore();

  return (
    <header className={styles.header}>
      <nav aria-label="Header navigation">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/profile" className={styles.navLink} aria-label="Profile">
              <div className={styles.iconWrapper}>
                <FaUser className={styles.icon} />
                <div className={styles.checkCircle}>
                  <FaCheck />
                </div>
              </div>
              <span className={styles.label}>Profile</span>
            </a>
          </li>

          <li className={styles.navItem}>
            <a
              href="/favorites"
              className={styles.navLink}
              aria-label="Favorites"
            >
              <div className={styles.iconWrapper}>
                <FaRegStar className={styles.icon} />
                <div className={styles.greyCircle}>5</div>
              </div>
              <span className={styles.label}>Favorites</span>
            </a>
          </li>

          <li className={styles.navItem}>
            <a
              href="/cart"
              className={styles.navLink}
              aria-label="Shopping Cart"
            >
              <div className={styles.iconWrapper}>
                <FaBagShopping className={styles.icon} />
                {totalQuantity === 0 ? (
                  ""
                ) : (
                  <div className={styles.redCircle}>{totalQuantity}</div>
                )}
              </div>
              <span className={styles.label}>Cart</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
