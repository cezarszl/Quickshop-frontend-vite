import CategoriesGrid from "@/components/home/CategoriesGrid/CategoriesGrid";
import styles from "./home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <CategoriesGrid />
    </div>
  );
};
export default Home;
