import { Product } from "@/stores/productStore";
import styles from "./productCard.module.css";
import axiosInstance from "@/helpers/axiosInstance";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
}

const baseUrl = axiosInstance.defaults.baseURL;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  return (
    <div className={styles.col12}>
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <img
            src={`${baseUrl}${product.imageUrl}`}
            alt={product.name}
            width={444}
          />
        </div>

        <div className={styles.productDescription}>
          <div className={styles.productMetadata}>
            <span className={styles.line}></span>
            <div>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <h6 className={styles.name}>{product.name}</h6>
            </div>
          </div>
          <div className={styles.basketWrapper}>
            <div className={styles.basket} onClick={handleAddToCart}>
              🛒
            </div>
            <span className={styles.tooltip}>Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
