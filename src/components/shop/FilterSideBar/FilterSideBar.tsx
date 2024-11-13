import { useEffect } from "react";
import styles from "./filterSideBar.module.css";
import { useCategoryStore } from "@/store/categoryStore";
import { useBrandStore } from "@/store/brandStore";
import { useColorStore } from "@/store/colorStore";
import PriceSlider from "../PriceSlider/PriceSlider";
import { useProductStore } from "@/store/productStore";

const FilterSidebar: React.FC = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { brands, fetchBrands } = useBrandStore();
  const { colors, fetchColors } = useColorStore();
  const { filters, setFilter, fetchFilteredProducts, toogleBrand } =
    useProductStore();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchColors();
  }, [fetchCategories, fetchBrands]);

  const handleCategoryClick = (categoryId: number) => {
    setFilter("categoryId", categoryId);
    fetchFilteredProducts();
  };

  const handleBrandChange = (brandId: number) => {
    toogleBrand(brandId);
    fetchFilteredProducts();
  };

  const handleColorClick = (colorId: number) => {
    setFilter("colorId", colorId);
    fetchFilteredProducts();
  };

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
              <li
                key={category.id}
                className={styles.categoryItem}
                onClick={() => handleCategoryClick(category.id)}
              >
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
                    checked={filters.brandIds?.includes(brand.id)}
                    onChange={() => handleBrandChange(brand.id)}
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
                  onClick={() => handleColorClick(color.id)}
                ></span>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Slider Section */}
        <div className={styles.priceSliderSection}>
          <h3 className={styles.title}>Price</h3>
          <PriceSlider />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
