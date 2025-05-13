import { Link } from "react-router-dom";
import styles from "./notLoggedIn.module.css";

const NotLoggedIn: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.notLoggedInCard}>
          <div className={styles.notLoggedInHeader}>
            <svg
              className={styles.emptyIcon}
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
            <h2 className={styles.title}>Not Logged In</h2>
            <p className={styles.message}>
              You need to be logged in to view this site.
            </p>
          </div>
          <div className={styles.notLoggedInActions}>
            <div className={styles.buttonGroup}>
              <Link to="/login" className={styles.primaryButton}>
                Log In
              </Link>
              <Link to="/register" className={styles.secondaryButton}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotLoggedIn;
