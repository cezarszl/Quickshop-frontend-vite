import { useLoginStore } from "@/stores/loginStore";
import styles from "./account-menu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface AccountMenuProps {
  onClose?: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ onClose }) => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const user = useLoginStore((state) => state.user);
  const logout = useLoginStore((state) => state.logout);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        onClose
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      if (onClose) onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.accountMenu} ref={menuRef}>
      <div className={styles.menuArrow}></div>

      {isLoggedIn && user && (
        <div className={styles.userGreeting}>
          <div className={styles.avatar}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.name || "User"}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link to="/myprofile" className={styles.menuLink}>
              <svg
                className={styles.menuIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>My Profile</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/myorders" className={styles.menuLink}>
              <svg
                className={styles.menuIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>My Orders</span>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/wishlist" className={styles.menuLink}>
              <svg
                className={styles.menuIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Wishlist</span>
            </Link>
          </li>
        </ul>
      )}

      <div className={styles.menuActions}>
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.actionButton}>
            {isLoggingOut ? (
              <span className={styles.buttonLoader}>
                <span className={styles.loaderDot}></span>
                <span className={styles.loaderDot}></span>
                <span className={styles.loaderDot}></span>
              </span>
            ) : (
              <>
                <svg
                  className={styles.buttonIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </>
            )}
          </button>
        ) : (
          <div className={styles.authActions}>
            <Link to="/login" className={styles.actionButton}>
              <svg
                className={styles.buttonIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Log In</span>
            </Link>
            <Link to="/register" className={styles.registerLink}>
              <span>New here? Create an account</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountMenu;
