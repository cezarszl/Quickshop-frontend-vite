import FilterSideBar from "@/components/shop/FilterSideBar/FilterSideBar";
import styles from "./shop.module.css";

const Shop: React.FC = () => {
  return (
    <div className={styles.shopContainer}>
      <div className={styles.filterSideBar}>
        <FilterSideBar />
      </div>
      <div className={styles.shopContent}>
        {/* Tutaj wstawiasz treść sklepu */}
      </div>
    </div>
  );
};
export default Shop;
