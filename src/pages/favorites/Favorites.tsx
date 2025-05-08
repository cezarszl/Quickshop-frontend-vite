import { useEffect } from "react";
import axiosInstance from "@/helpers/axiosInstance";
import styles from "./favorites.module.css";
import { FaStar, FaTrash } from "react-icons/fa";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useLoginStore } from "@/stores/loginStore";

const baseUrl = axiosInstance.defaults.baseURL;

const Favorites: React.FC = () => {
  const { favorites, fetchFavorites, removeFavorite } = useFavoriteStore();
  const user = useLoginStore((state) => state.user);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (!user) {
    return (
      <div className={styles.emptyFavorites}>
        <h2>You are not logged in.</h2>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyFavorites}>
        <FaStar className={styles.starIcon} />
        <h2>You have no favorites.</h2>
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
                      <a href="#">
                        <img
                          src={`${baseUrl}${item.productDetails?.imageUrl}`}
                          alt={item.productDetails?.name}
                        />
                      </a>
                    </td>
                    <td className={styles.favoriteProductDesc}>
                      <h5>{item.productDetails?.name}</h5>
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
