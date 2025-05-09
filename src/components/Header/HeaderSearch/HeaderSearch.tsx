import { useState, useEffect, useRef } from "react";
import styles from "./headerSearch.module.css";
import useDebounce from "@/hooks/useDebounce";
import axiosInstance from "@/helpers/axiosInstance";
import { Link } from "react-router-dom";

const HeaderSearch: React.FC = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedInput = useDebounce(input, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(
          `/products?name=${debouncedInput}`
        );
        setResults(response.data.products.slice(0, 5));
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      }
    };

    if (debouncedInput.trim()) {
      fetchResults();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [debouncedInput]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.searchWrapper} ref={dropdownRef}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
        className={styles.searchInput}
      />
      {showDropdown && results.length > 0 && (
        <div className={styles.dropdown}>
          <ul className={styles.dropdownList}>
            {results.map((product) => (
              <li key={product.id} className={styles.dropdownItem}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={`${axiosInstance.defaults.baseURL}${product.imageUrl}`}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <span className={styles.productName}>{product.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
