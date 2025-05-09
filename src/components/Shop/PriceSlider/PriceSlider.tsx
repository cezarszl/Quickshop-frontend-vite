import React, { useEffect, useState } from "react";
import { useProductStore } from "@/stores/productStore";
import styles from "./priceSlider.module.css";
import useDebounce from "@/hooks/useDebounce";

const PriceSlider = () => {
  const { filters, setFilter, fetchFilteredProducts } = useProductStore();
  const [minVal, setMinVal] = useState(filters.minPrice || 10);
  const [maxVal, setMaxVal] = useState(filters.maxPrice || 1000);

  const debouncedMin = useDebounce(minVal, 500);
  const debouncedMax = useDebounce(maxVal, 500);

  useEffect(() => {
    setFilter("minPrice", debouncedMin);
    setFilter("maxPrice", debouncedMax);
    fetchFilteredProducts();
  }, [debouncedMin, debouncedMax]);

  // Handle min price change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 10);
    setMinVal(value);
  };

  // Handle max price change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 10);
    setMaxVal(value);
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
