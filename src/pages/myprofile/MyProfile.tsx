import { useLoginStore } from "@/stores/loginStore";
import styles from "./myProfile.module.css";

const MyProfile: React.FC = () => {
  const user = useLoginStore((state) => state.user);

  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <h2>You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileField}>
        <h2>My Profile</h2>
        <strong>Name:</strong> <span>{user.name}</span>
        <div className={styles.profileField}>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
