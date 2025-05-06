import { useLoginStore } from "@/stores/loginStore";
import styles from "./account-menu.module.css";
import { useNavigate } from "react-router-dom";

interface AccountMenuProps {}

const AccountMenu: React.FC<AccountMenuProps> = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const logout = useLoginStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.accountMenu}>
      <ul>
        <li>My profile</li>
        <li>My orders</li>
      </ul>
      {isLoggedIn ? (
        <button onClick={handleLogout} className={styles.loginBtn}>
          LOGOUT
        </button>
      ) : (
        <a href="/login" className={styles.loginBtn}>
          LOGIN
        </a>
      )}
      <a href="/register" className={styles.registerLink}>
        New here? Register now
      </a>
    </div>
  );
};

export default AccountMenu;
