import { useEffect, useState } from "react";
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
  const {
    filters,
    setFilter,
    fetchFilteredProducts,
    toogleBrand,
    fetchProducts,
  } = useProductStore();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchColors();
  }, [fetchCategories, fetchBrands]);

  const handleCategoryClick = (categoryId: number) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      fetchProducts();
    } else {
      setActiveCategory(categoryId);
      setFilter("categoryId", categoryId);
      fetchFilteredProducts();
    }
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
    <>
      {/* Categories Section */}
      <div className={styles.categoriesSection}>
        <h3 className={styles.categoriesSectionTitle}>Categories</h3>
        <ul
          className={styles.categoriesList}
          role="group"
          aria-labelledby="category-selection"
        >
          {categories.map((category) => (
            <li
              key={category.id}
              className={`${styles.categoriesItem} ${
                activeCategory === category.id ? styles.activeCategory : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Section */}
      <div className={styles.brandsSection}>
        <h3 id="brand-selection" className={styles.brandsSectionTitle}>
          Brands
        </h3>
        <ul
          className={styles.brandsList}
          role="group"
          aria-labelledby="brand-selection"
        >
          {brands.map((brand) => (
            <li key={brand.id} className={styles.brandsItem}>
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                value={brand.id}
                className={styles.checkbox}
                checked={(filters.brandIds || []).includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className={styles.brandLabel}
              >
                {brand.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Colors Section */}
      <div className={styles.colorsSection}>
        <h3 className={styles.colorsSectionTitle}>Color</h3>
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
        <h3 className={styles.priceSliderSectionTitle}>Price</h3>
        <PriceSlider />
      </div>
    </>
  );
};

export default FilterSidebar;
