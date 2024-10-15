import { useEffect, useMemo } from "react";
import { useProductStore, baseUrl } from "@/store/productStore";
// import { Link } from "react-router-dom";
const RandomProductsGrid = () => {
  const { randomProducts, fetchRandomProducts, minPrices, fetchMinPrices } =
    useProductStore();

  useEffect(() => {
    fetchRandomProducts();
    fetchMinPrices();
  }, [fetchRandomProducts, fetchMinPrices]);

  const minPricesMap = useMemo(() => {
    return minPrices.reduce((acc, { categoryId, minPrice }) => {
      acc[categoryId] = minPrice;
      return acc;
    }, {} as Record<number, number>);
  }, [minPrices]);

  return (
    <div className="products-grid">
      {" "}
      {randomProducts.map((product) => (
        <div key={product.id} className="product-card">
          {" "}
          {/* <Link to={`/product/${product.id}`}> */}
          <div className="product-image-container">
            {" "}
            <img
              src={`${baseUrl}${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info-overlay">
              {" "}
              <h1 className="product-category-name">{product.categoryName}</h1>
              {minPricesMap[product.categoryId] !== undefined ? (
                <p className="product-price">
                  From ${minPricesMap[product.categoryId].toFixed(2)}
                </p>
              ) : (
                <p className="product-price">Price not available</p>
              )}
            </div>
          </div>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default RandomProductsGrid;
