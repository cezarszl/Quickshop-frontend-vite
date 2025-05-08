import { Product } from "@/stores/productStore";
import styles from "./productCard.module.css";
import axiosInstance from "@/helpers/axiosInstance";
import { useCartStore } from "@/stores/cartStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useLoginStore } from "@/stores/loginStore";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

const baseUrl = axiosInstance.defaults.baseURL;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const exists = favorites.some((f) => f.productId === product.id);
    setIsFavorite(exists);
  }, [favorites, product.id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!isLoggedIn) return alert("Please login to use favorites");

    try {
      if (isFavorite) {
        await removeFavorite(product.id);
      } else {
        await addFavorite(product.id);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
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
          <div className={styles.actionsWrapper}>
            <div className={styles.favWrapper}>
              <span className={styles.favorite} onClick={toggleFavorite}>
                {isFavorite ? "★" : "☆"}
              </span>
              <span className={styles.favTooltip}>Add to Favorites</span>
            </div>
            <div className={styles.basketWrapper}>
              <span className={styles.basket} onClick={handleAddToCart}>
                🛒
              </span>
              <span className={styles.basketTooltip}>Add to Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
