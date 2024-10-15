import CategoriesGrid from "@/components/home/CategoriesGrid/CategoriesGrid";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <CategoriesGrid />
    </div>
  );
}
