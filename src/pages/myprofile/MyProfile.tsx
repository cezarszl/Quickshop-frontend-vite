import { useLoginStore } from "@/stores/loginStore";
import styles from "./myProfile.module.css";
import { Link } from "react-router-dom";
import NotLoggedIn from "../favorites/notloggedin/NotLoggedIn";

const MyProfile: React.FC = () => {
  const user = useLoginStore((state) => state.user);

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className={styles.title}>My Profile</h2>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profileSection}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>

              <div className={styles.profileField}>
                <div className={styles.fieldLabel}>Full Name</div>
                <div className={styles.fieldValue}>{user.name}</div>
              </div>

              <div className={styles.profileField}>
                <div className={styles.fieldLabel}>Email Address</div>
                <div className={styles.fieldValue}>{user.email}</div>
              </div>
            </div>

            <div className={styles.profileSection}>
              <h3 className={styles.sectionTitle}>Account Information</h3>

              <div className={styles.profileField}>
                <div className={styles.fieldLabel}>Account ID</div>
                <div className={styles.fieldValue}>
                  {String(user.id).substring(0, 8)}
                </div>
              </div>

              <div className={styles.profileField}>
                <div className={styles.fieldLabel}>Member Since</div>
                <div className={styles.fieldValue}>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.linkSection}>
          <Link to="/myorders" className={styles.navLink}>
            <svg
              className={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0" />
            </svg>
            View My Orders
          </Link>

          <Link to="/favorites" className={styles.navLink}>
            <svg
              className={styles.navIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            My Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
