import { Product, baseUrl } from "@/store/productStore";
import styles from "./productCard.module.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <img
        src={`${baseUrl}${product.imageUrl}`}
        alt={product.name}
        className={styles.image}
        width={444}
      />
      <span className={styles.line}></span>
      <div className={styles.details}>
        <div>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <h6 className={styles.name}>{product.name}</h6>
        </div>
        <div className={styles.basketWrapper}>
          <div className={styles.basket}>🛒</div>
          <span className={styles.tooltip}>Add to Cart</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
