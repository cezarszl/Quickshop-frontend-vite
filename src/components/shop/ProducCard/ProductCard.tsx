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
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.categoryName}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
