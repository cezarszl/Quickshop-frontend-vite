import { useEffect } from "react";
import styles from "./filterSideBar.module.css";
import { useCategoryStore } from "@/store/categoryStore";
import { useBrandStore } from "@/store/brandStore";
import { useColorStore } from "@/store/colorStore";

const FilterSidebar: React.FC = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { brands, fetchBrands } = useBrandStore();
  const { colors, fetchColors } = useColorStore();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchColors();
  }, [fetchCategories, fetchBrands]);

  return (
    <div className={styles.filterSideBarContainer}>
      <div className={styles.filterSideBar}>
        {/* Categories Section */}
        <div className={styles.categoriesSection}>
          <h3 className={styles.title}>Categories</h3>
          <ul
            className={styles.categoryList}
            role="group"
            aria-labelledby="category-selection"
          >
            {categories.map((category) => (
              <li key={category.id} className={styles.categoryItem}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands Section */}
        <div className={styles.brandsSection}>
          <h3 id="brand-selection" className={styles.subtitle}>
            Brands
          </h3>
          <ul
            className={styles.brandsList}
            role="group"
            aria-labelledby="brand-selection"
          >
            {brands.map((brand) => (
              <li key={brand.id} className={styles.brandsItem}>
                <label
                  htmlFor={`brand-${brand.id}`}
                  className={styles.brandLabel}
                >
                  <input
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    value={brand.id}
                    className={styles.checkbox}
                  />
                  {brand.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* Colors Section */}
        <div className={styles.colorsSection}>
          <h3 className={styles.title}>Color</h3>
          <ul
            className={styles.colorsList}
            role="group"
            aria-labelledby="colors-selection"
          >
            {colors.map((color) => (
              <li key={color.id} className={styles.colorsItem}>
                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: color.name.toLocaleUpperCase() }}
                  title={color.name}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
