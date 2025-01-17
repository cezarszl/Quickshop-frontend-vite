import { useProductStore } from "@/stores/productStore";
import styles from "./topBar.module.css";

const TopBar: React.FC = () => {
  const {
    sortOption,
    itemsPerPage,
    setSortOption,
    setItemsPerPage,
    fetchFilteredProducts,
    products,
    totalCount,
  } = useProductStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    fetchFilteredProducts();
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    fetchFilteredProducts();
  };
  return (
    <div className={styles.shopTopRow}>
      <div className={styles.shopTopCol}>
        <div className={styles.shopTopWrapper}>
          <div className={styles.totalProducts}>
            <p>
              SHOWING{" "}
              {products.length > 0
                ? `1-${
                    itemsPerPage < products.length
                      ? itemsPerPage
                      : products.length
                  } OF ${totalCount}`
                : "0"}
            </p>
          </div>
          <div className={styles.sortSection}>
            <div className={styles.sortByDate}>
              <label htmlFor="sortByName" className={styles.label}>
                Sort by
              </label>
              <select
                id="sortByName"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="name-asc">Name</option>
                <option value="price-asc">Price</option>
              </select>
            </div>
            <div className={styles.sortByView}>
              <label htmlFor="itemsPerPage" className={styles.label}>
                Show
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
