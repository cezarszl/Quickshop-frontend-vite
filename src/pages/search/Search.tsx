import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "@/stores/searchStore";
import styles from "./search.module.css";
import { Search } from "lucide-react";

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

  // Renderowanie pustych stanów w spójnym stylu z Cart i Favorites
  const renderEmptyState = () => {
    if (loading) {
      return (
        <div className={styles.messageCard}>
          <div className={styles.emptyState}>
            <div className={styles.loadingSpinner}></div>
            <p>Searching for products...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.messageCard}>
          <div className={styles.emptyState}>
            <Search className={styles.emptyIcon} />
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (query && results.length === 0) {
      return (
        <div className={styles.messageCard}>
          <div className={styles.emptyState}>
            <Search className={styles.emptyIcon} />
            <p>No products found for "{query}"</p>
            <button
              onClick={() => {
                setInput("");
                setQuery("");
                setSearchParams({});
                useSearchStore.setState({ results: [], error: null });
              }}
              className={styles.primaryButton}
            >
              Clear Search
            </button>
          </div>
        </div>
      );
    }

    if (!query) {
      return (
        <div className={styles.messageCard}>
          <div className={styles.emptyState}>
            <Search className={styles.emptyIcon} />
            <p>Start typing to search for products</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Search Products</h2>

        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Search for products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <Search size={20} />
            </button>
          </div>
        </form>

        {results.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className={styles.resultsContainer}>
            <p className={styles.resultsCount}>
              Found {results.length} product{results.length !== 1 ? "s" : ""}
            </p>
            <div className={styles.resultsGrid}>
              {results.map((product) => (
                <a
                  href={`/product/${product.id}`}
                  key={product.id}
                  className={styles.productCard}
                >
                  <div className={styles.productImageContainer}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
