import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/productStore";
import styles from "./product.module.css";
import axiosInstance from "@/helpers/axiosInstance";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, fetchProductById } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id));
    }
  }, [id, fetchProductById]);

  if (!selectedProduct) {
    return <div className={styles.loading}>Loading...</div>;
  }
  console.log(selectedProduct.imageUrl);
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={`${selectedProduct.imageUrl}`}
          alt={selectedProduct.name}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h1 className={styles.name}>{selectedProduct.name}</h1>
        <p className={styles.price}>${selectedProduct.price.toFixed(2)}</p>
        <p className={styles.description}>{selectedProduct.description}</p>
        <p className={styles.meta}>
          <strong>Brand:</strong> {selectedProduct.brandName}
        </p>
        <p className={styles.meta}>
          <strong>Color:</strong> {selectedProduct.colorName}
        </p>
        <p className={styles.meta}>
          <strong>Category:</strong> {selectedProduct.categoryName}
        </p>
      </div>
    </div>
  );
};

export default Product;
