import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/Shop/ProducCard/ProductCard";
import styles from "./category.module.css";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const { products, setFilter, fetchFilteredProducts } = useProductStore();

  useEffect(() => {
    if (categoryName) {
      setFilter("categoryName", categoryName);
      fetchFilteredProducts();
    }
  }, [categoryName, setFilter, fetchFilteredProducts]);

  return (
    <>
      <div className={styles.sideBar}></div>
      <div className={styles.productsGrid}>
        <div className={styles.categoryTitle}>{categoryName}</div>

        <div className={styles.categoryContainer}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
