import { useEffect } from "react";
import styles from "./favorites.module.css";
import { FaTrash } from "react-icons/fa";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useLoginStore } from "@/stores/loginStore";
import { Link } from "react-router-dom";
import NotLoggedIn from "./notloggedin/NotLoggedIn";
import { Star } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, fetchFavorites, removeFavorite } = useFavoriteStore();
  const user = useLoginStore((state) => state.user);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (!user) {
    return <NotLoggedIn />;
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.messageCard}>
            <h2 className={styles.title}>My Favorites</h2>
            <div className={styles.emptyState}>
              <Star className={styles.emptyIcon} size={60} />
              <p>Your favorites list is currently empty.</p>
              <Link to="/shop" className={styles.primaryButton}>
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesTableArea}>
      <div className={styles.row}>
        <div className={styles.col8}>
          <div className={styles.favoritesTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((item) => (
                  <tr key={item.productId}>
                    <td className={styles.favoriteProductImage}>
                      <Link to={`/product/${item.productId}`}>
                        <img
                          src={item.productDetails?.imageUrl}
                          alt={item.productDetails?.name}
                        />
                      </Link>
                    </td>
                    <td className={styles.favoriteProductName}>
                      <Link to={`/product/${item.productId}`}>
                        <h5>{item.productDetails?.name}</h5>
                      </Link>
                    </td>
                    <td className={styles.price}>
                      <span>${item.productDetails?.price}</span>
                    </td>
                    <td>
                      <FaTrash
                        className={styles.removeBtn}
                        onClick={() => removeFavorite(item.productId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
