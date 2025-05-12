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

  if (isLoading)
    return <div className={styles.loading}>Finalizing your order...</div>;

  return (
    <div className={styles.successContainer}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed.</p>
      <button className={styles.button} onClick={() => navigate("/")}>
        Go back to shop
      </button>
    </div>
  );
};

export default SuccessPayment;
