import styles from "./account-menu.module.css";

interface AccountMenuProps {}

const AccountMenu: React.FC<AccountMenuProps> = () => {
  return (
    <div className={styles.accountMenu}>
      <ul>
        <li>My profile</li>
        <li>My orders</li>
      </ul>
      <a href="/login" className={styles.loginBtn}>
        LOGIN
      </a>
      <a href="/register" className={styles.registerLink}>
        New here? Register now
      </a>
    </div>
  );
};

export default AccountMenu;
