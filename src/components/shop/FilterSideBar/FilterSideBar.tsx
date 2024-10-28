import { useEffect } from "react";
import styles from "./filterSideBar.module.css";
import { useCategoryStore } from "@/store/categoryStore";

const FilterSidebar: React.FC = () => {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  console.log(categories);
  return (
    <div className={styles.filterSideBarContainer}>
      <div className={styles.filterSideBar}>
        <h2 className={styles.title}>Categories</h2>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li key={category.id} className={styles.categoryItem}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
