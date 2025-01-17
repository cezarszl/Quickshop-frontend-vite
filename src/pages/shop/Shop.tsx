import FilterSideBar from "@/components/Shop/FilterSideBar/FilterSideBar";
import styles from "./shop.module.css";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/Shop/ProducCard/ProductCard";
import { useEffect } from "react";
import TopBar from "@/components/Shop/TopBar/TopBar";

const Shop: React.FC = () => {
  const { products, fetchFilteredProducts } = useProductStore();
  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  return (
    <>
      <div className={styles.filterSideBar}>
        <FilterSideBar />
      </div>
      <div className={styles.shopContainer}>
        <div className={styles.shopContent}>
          <TopBar />
          <div className={styles.productsRow}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
