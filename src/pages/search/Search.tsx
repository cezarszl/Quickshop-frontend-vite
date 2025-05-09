import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "@/stores/searchStore";
import axiosInstance from "@/helpers/axiosInstance";
import styles from "./search.module.css";

const baseUrl = axiosInstance.defaults.baseURL;

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, results, loading, error, setQuery, fetchResults } =
    useSearchStore();

  const [input, setInput] = useState(query);

  useEffect(() => {
    const param = searchParams.get("query");
    if (param && param !== query) {
      setQuery(param);
      fetchResults(param);
      setInput(param);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ query: input.trim() });
    } else {
      setQuery("");
      setSearchParams({});
      useSearchStore.setState({ results: [], error: null });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for products..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.searchInput}
        />
      </form>

      {loading && (
        <div className={styles.message}>
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className={styles.message}>
          <h2>{error}</h2>
        </div>
      )}
      {!loading && results.length === 0 && (
        <div className={styles.message}>
          <h2>No products found.</h2>
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.resultsWrapper}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {results.map((product) => (
                <tr key={product.id}>
                  <td className={styles.imageCell}>
                    <a href={`/product/${product.id}`}>
                      <img
                        src={`${baseUrl}${product.imageUrl}`}
                        alt={product.name}
                      />
                    </a>
                  </td>
                  <td className={styles.nameCell}>
                    <a href={`/product/${product.id}`}>
                      <h5>{product.name}</h5>
                    </a>
                  </td>
                  <td className={styles.priceCell}>
                    <span>${product.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
