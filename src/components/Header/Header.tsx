import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { FaCheck, FaUser } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { useCartStore } from "@/stores/cartStore";
import AccountMenu from "./AccountMenu/AccountMenu";
import { useLoginStore } from "@/stores/loginStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header: React.FC = () => {
  const { totalQuantity } = useCartStore();
  const { totalFavQuantity } = useFavoriteStore();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const profileIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileIconRef.current?.contains(e.target as Node)) {
        setIsAccountMenuOpen((prev) => !prev);
        return;
      }

      setIsAccountMenuOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className={styles.header}>
      <HeaderSearch />
      <nav aria-label="Header navigation">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span
              ref={profileIconRef}
              className={styles.navLink}
              aria-label="Profile"
            >
              <div className={styles.iconWrapper}>
                <FaUser className={styles.icon} />
                {isLoggedIn && (
                  <div className={styles.checkCircle}>
                    <FaCheck />
                  </div>
                )}
              </div>
              <span className={styles.label}>Profile</span>
            </span>
            {isAccountMenuOpen && (
              <AccountMenu totalFavQuantity={totalFavQuantity} />
            )}
          </li>
          <li className={styles.navItem}>
            <a
              href="/cart"
              className={styles.navLink}
              aria-label="Shopping Cart"
            >
              <div className={styles.iconWrapper}>
                <FaBagShopping className={styles.icon} />
                {totalQuantity !== 0 && (
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
