import FilterSidebar from "@/components/shop/FilterSidebar/FilterSidebar";
import styles from "./shop.module.css";

export default function Shop() {
  return (
    <div className={styles.mainContainer}>
      <FilterSidebar />
    </div>
  );
}
