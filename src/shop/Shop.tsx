import FilterSideBar from "@/components/shop/FilterSideBar/FilterSideBar";
import styles from "./shop.module.css";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/shop/ProducCard/ProductCard";
import { useEffect } from "react";
import TopBar from "@/components/shop/TopBar/TopBar";

const Shop: React.FC = () => {
  // const { products, fetchProducts } = useProductStore();
  const { products, fetchFilteredProducts } = useProductStore();
  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  return (
    <div className={styles.shopContainer}>
      <div className={styles.filterSideBar}>
        <FilterSideBar />
      </div>
      <div className={styles.shopContent}>
        <TopBar />
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
