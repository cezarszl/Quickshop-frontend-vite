import { useProductStore } from "@/store/productStore";
import styles from "./topBar.module.css";

const TopBar: React.FC = () => {
  const {
    sortOption,
    itemsPerPage,
    setSortOption,
    setItemsPerPage,
    fetchFilteredProducts,
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
    <div className={styles.topBar}>
      <div className={styles.filterContainer}>
        <div className={styles.sortSection}>
          <label htmlFor="sort" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className={styles.select}
          >
            <option value="name-asc">Name</option>
            <option value="price-asc">Price</option>
            {/* <option value="default">Default</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-desc">Name: Z to A</option> */}
          </select>
        </div>
        <div className={styles.sortSection}>
          <label htmlFor="itemsPerPage" className={styles.label}>
            Show
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={styles.select}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
