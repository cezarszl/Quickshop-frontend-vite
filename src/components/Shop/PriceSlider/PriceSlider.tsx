import React, { useCallback, useState } from "react";
import { useProductStore } from "@/stores/productStore";
import debounce from "@/components/Sidebar/helpers/debounce";
import styles from "./priceSlider.module.css";

const PriceSlider = () => {
  const { filters, setFilter, fetchFilteredProducts } = useProductStore();
  const [minVal, setMinVal] = useState(filters.minPrice || 10);
  const [maxVal, setMaxVal] = useState(filters.maxPrice || 1000);

  // Debounce api requests
  const debouncedFetch = useCallback(debounce(fetchFilteredProducts, 500), [
    fetchFilteredProducts,
  ]);

  // Handle min price change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 10);
    setMinVal(value);
    setFilter("minPrice", value);
    debouncedFetch();
  };

  // Handle max price change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 10);
    setMaxVal(value);
    setFilter("maxPrice", value);
    debouncedFetch();
  };

  // Convert to percentage for styling
  const getPercent = (value: number) =>
    Math.round(((value - 10) / (1000 - 10)) * 100);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        {/* Minimalna wartość */}
        <input
          type="range"
          min="10"
          max="1000"
          value={minVal}
          onChange={handleMinChange}
          className={`${styles.thumb} ${styles.thumbLeft}`}
        />
        {/* Maksymalna wartość */}
        <input
          type="range"
          min="10"
          max="1000"
          value={maxVal}
          onChange={handleMaxChange}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />
        {/* Pasek zakresu */}
        <div className={styles.sliderTrack}></div>
        <div
          className={styles.range}
          style={{
            left: `${getPercent(minVal)}%`,
            right: `${100 - getPercent(maxVal)}%`,
          }}
        ></div>
      </div>
      <div className={styles.values}>
        <span>
          ${minVal} - ${maxVal}
        </span>
      </div>
    </div>
  );
};

export default PriceSlider;
