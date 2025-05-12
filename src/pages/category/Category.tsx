import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/Shop/ProducCard/ProductCard";
import styles from "./category.module.css";

const Category: React.FC = () => {
  const { categoryName } = useParams();
  const { products, setFilter, fetchFilteredProducts } = useProductStore();

  useEffect(() => {
    if (categoryName) {
      setFilter("categoryName", categoryName);
      fetchFilteredProducts();
    }
  }, [categoryName, setFilter, fetchFilteredProducts]);

  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryContent}>
          <h1 className={styles.categoryTitle}>{categoryName}</h1>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
