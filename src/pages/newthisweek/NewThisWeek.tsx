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
    return <div className={styles.empty}>No new products this week.</div>;
  }

  return (
    <div>
      <div className={styles.newThisWeekTitle}>🆕 New This Week</div>

      <div className={styles.newThisWeekContainer}>
        {newThisWeekProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewThisWeek;
