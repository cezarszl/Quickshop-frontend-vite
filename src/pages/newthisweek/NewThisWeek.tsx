import { useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/Shop/ProducCard/ProductCard";
import styles from "./newThisWeek.module.css";

const NewThisWeek: React.FC = () => {
  const { newThisWeekProducts, fetchNewThisWeek } = useProductStore();

  useEffect(() => {
    fetchNewThisWeek();
  }, [fetchNewThisWeek]);

  if (!newThisWeekProducts || newThisWeekProducts.length === 0) {
    return (
      <div className={styles.categoryPage}>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryContent}>
            <h1 className={styles.categoryTitle}>New This Week</h1>
            <div className={styles.empty}>
              <p>No new products this week.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryContent}>
          <h1 className={styles.categoryTitle}>New This Week</h1>
          <div className={styles.productsGrid}>
            {newThisWeekProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewThisWeek;
