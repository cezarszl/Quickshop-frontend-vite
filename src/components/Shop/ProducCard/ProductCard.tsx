import { Product } from "@/stores/productStore";
import styles from "./productCard.module.css";
import { useCartStore } from "@/stores/cartStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useLoginStore } from "@/stores/loginStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

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
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <Link to={`/product/${product.id}`} className={styles.productImageLink}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
          />
        </Link>
        <div className={styles.productActions}>
          <button
            className={`${styles.actionButton} ${styles.favoriteButton}`}
            onClick={toggleFavorite}
            disabled={!isLoggedIn}
            title={isLoggedIn ? "Add to Favorites" : "Log in to add favorite"}
          >
            <Heart
              className={styles.actionIcon}
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth={isFavorite ? 0 : 1.5}
            />
          </button>
          <button
            className={`${styles.actionButton} ${styles.cartButton}`}
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingCart className={styles.actionIcon} />
          </button>
        </div>
      </div>

      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
