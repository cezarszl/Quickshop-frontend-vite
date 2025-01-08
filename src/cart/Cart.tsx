import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import axiosInstance from "@/helpers/axiosInstance";
import styles from "./cart.module.css";

const baseUrl = axiosInstance.defaults.baseURL;
const CartPage: React.FC = () => {
  const { cartItems, fetchCart, clearCart } = useCartStore();
  const cartId = localStorage.getItem("anonymousCartId");

  const handleClearCart = () => {
    if (!cartId) return; // early return jeśli nie ma cartId
    clearCart(cartId);
  };

  useEffect(() => {
    if (cartId) {
      fetchCart(cartId);
    }
  }, [fetchCart, cartId]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h1>Your Cart</h1>
      <ul className={styles.cartList}>
        {cartItems.map((item) => (
          <li
            key={`${item.cartId}-${item.productId}`}
            className={styles.cartItem}
          >
            {item.productDetails && (
              <>
                <img
                  src={`${baseUrl}${item.productDetails.imageUrl}`}
                  alt={item.productDetails.name}
                  className={styles.productImage}
                />
                <div className={styles.details}>
                  <h2 className={styles.productName}>
                    {item.productDetails.name}
                  </h2>
                  <p className={styles.productPrice}>
                    ${item.productDetails.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className={styles.totalPrice}>
                    Total: $
                    {(item.productDetails.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <button className={styles.clearButton} onClick={handleClearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
