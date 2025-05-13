import { useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import styles from "./categoriesGrid.module.css";
import { Link } from "react-router-dom";

const CategoriesGrid: React.FC = () => {
  const { randomProducts, fetchRandomProducts, minPrices, fetchMinPrices } =
    useProductStore();

  useEffect(() => {
    fetchRandomProducts();
    fetchMinPrices();
  }, [fetchRandomProducts, fetchMinPrices]);

  const minPricesMap = minPrices.reduce((acc, { categoryId, minPrice }) => {
    acc[categoryId] = minPrice;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.gridContainer}>
        {randomProducts.map((product) => (
          <Link
            key={product.id}
            to={`/category/${product.categoryName.toLowerCase()}`}
          >
            <div className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img
                  className={styles.productImage}
                  src={product.imageUrl}
                  alt={product.categoryName}
                  loading="lazy"
                />
                <div className={styles.productInfo}>
                  <h2 className={styles.productCategory}>
                    {product.categoryName}
                  </h2>
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
    </div>
  );
};

export default CategoriesGrid;
