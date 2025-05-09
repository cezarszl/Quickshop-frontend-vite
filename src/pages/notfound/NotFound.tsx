import styles from "./notFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Page not found</p>
      <a href="/">Go back home</a>
    </div>
  );
};

export default NotFound;
