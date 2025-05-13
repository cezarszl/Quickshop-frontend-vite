import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import styles from "./cart.module.css";
import QuantityControl from "@/components/Cart/QuantityControl/QuantityControl";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartPage: React.FC = () => {
  const { cartItems, fetchCart, getCartTotal, cartId } = useCartStore();

  useEffect(() => {
    if (cartId) {
      fetchCart(cartId);
    }
  }, [fetchCart, cartId]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.messageCard}>
            <h2 className={styles.title}>Shopping Cart</h2>
            <div className={styles.emptyState}>
              <ShoppingCart className={styles.emptyIcon} size={60} />
              <p>Your shopping cart is currently empty.</p>
              <Link to="/shop" className={styles.primaryButton}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartTableArea}>
      <div className={styles.row}>
        <div className={styles.col8}>
          <div className={styles.cartTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={`${item.productId}`}>
                    <td className={styles.cartProductImage}>
                      <Link to={`/product/${item.productId}`}>
                        <img
                          src={item.productDetails?.imageUrl}
                          alt={item.productDetails.name}
                        ></img>
                      </Link>
                    </td>
                    <td className={styles.cartProductName}>
                      <Link to={`/product/${item.productId}`}>
                        <h5>{item.productDetails.name}</h5>
                      </Link>
                    </td>
                    <td className={styles.price}>
                      <span>${item.productDetails.price}</span>
                    </td>
                    <td>
                      <QuantityControl
                        productId={item.productId}
                        currentQuantity={item.quantity}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.col4}>
          <div className={styles.cartSummary}>
            <h5>Cart Total</h5>
            <ul className={styles.summaryTable}>
              <li>
                <span>subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </li>
              <li>
                <span>delievery:</span>
                <span>Free</span>
              </li>
              <li>
                <span>total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </li>
            </ul>
            <div className={styles.checkoutBtn}>
              <a href="/checkout">Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
