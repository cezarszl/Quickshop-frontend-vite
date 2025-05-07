import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import axiosInstance from "@/helpers/axiosInstance";
import styles from "./cart.module.css";
import QuantityControl from "@/components/Cart/QuantityControl/QuantityControl";
import { FaShoppingBag } from "react-icons/fa";

const baseUrl = axiosInstance.defaults.baseURL;
const CartPage: React.FC = () => {
  const { cartItems, fetchCart, getCartTotal, cartId } = useCartStore();

  useEffect(() => {
    if (cartId) {
      fetchCart(cartId);
    }
  }, [fetchCart, cartId]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <FaShoppingBag className={styles.bagIcon} />
        <h2>Your cart is empty.</h2>
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
                      <a href="#">
                        <img
                          src={`${baseUrl}${item.productDetails?.imageUrl}`}
                          alt={item.productDetails.name}
                        ></img>
                      </a>
                    </td>
                    <td className={styles.cartProductDesc}>
                      <h5>{item.productDetails.name}</h5>
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
