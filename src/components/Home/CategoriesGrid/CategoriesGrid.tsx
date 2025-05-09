import { useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import styles from "./categoriesGrid.module.css";
import axiosInstance from "@/helpers/axiosInstance";
import { Link } from "react-router-dom";

const CategoriesGrid: React.FC = () => {
  const { randomProducts, fetchRandomProducts, minPrices, fetchMinPrices } =
    useProductStore();

  useEffect(() => {
    fetchRandomProducts();
    fetchMinPrices();
  }, [fetchRandomProducts, fetchMinPrices]);

  const baseUrl = axiosInstance.defaults.baseURL;

  const minPricesMap = minPrices.reduce((acc, { categoryId, minPrice }) => {
    acc[categoryId] = minPrice;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className={styles.gridContainer}>
      {randomProducts.map((product) => (
        <Link to={`/category/${product.categoryName.toLowerCase()}`}>
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImageContainer}>
              <img
                className={styles.productImage}
                src={`${baseUrl}${product.imageUrl}`}
                alt={product.name}
              />
              <div className={styles.productInfo}>
                <h1 className={styles.productCategory}>
                  {product.categoryName}
                </h1>
                {minPricesMap[product.categoryId] !== undefined ? (
                  <p className={styles.productPrice}>
                    From ${minPricesMap[product.categoryId].toFixed(2)}
                  </p>
                ) : (
                  <p className={styles.productPrice}>Price not available</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesGrid;
