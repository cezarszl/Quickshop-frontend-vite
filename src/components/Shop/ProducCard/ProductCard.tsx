import { Product } from "@/stores/productStore";
import styles from "./productCard.module.css";
import { useCartStore } from "@/stores/cartStore";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useLoginStore } from "@/stores/loginStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className={styles.col12}>
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <Link to={`/product/${product.id}`}>
            <img src={product.imageUrl} alt={product.name} width={444} />
          </Link>
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
              {isLoggedIn ? (
                <span className={styles.favorite} onClick={toggleFavorite}>
                  {isFavorite ? "★" : "☆"}
                </span>
              ) : (
                <span
                  className={styles.favorite}
                  title="Log in to add favorite"
                >
                  ☆
                </span>
              )}
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
