import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useLoginStore } from "@/stores/loginStore";
import styles from "./successPayment.module.css";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/stores/orderStore";

const SuccessPayment: React.FC = () => {
  const { cartItems, getCartTotal, resetCart } = useCartStore();
  const { user } = useLoginStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const { createOrder } = useOrderStore();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!user) return;

    const items = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    createOrder(user.id, items, getCartTotal()).finally(() => {
      resetCart();
      setIsLoading(false);
    });
  }, [cartItems, createOrder, getCartTotal, resetCart, user]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Finalizing your order...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className={styles.title}>Payment Successful</h1>
          <p className={styles.message}>
            Thank you for your purchase. Your order has been placed and is being
            processed.
          </p>
          <div className={styles.buttonGroup}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/myorders")}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
