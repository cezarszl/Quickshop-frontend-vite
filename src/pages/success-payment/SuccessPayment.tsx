import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useLoginStore } from "@/stores/loginStore";
import axiosInstance from "@/helpers/axiosInstance";
import styles from "./successPayment.module.css";
import { useNavigate } from "react-router-dom";

const SuccessPayment: React.FC = () => {
  const { cartItems, getCartTotal, resetCart } = useCartStore();
  const { user } = useLoginStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    const createOrder = async () => {
      try {
        if (!user) return;

        const items = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        await axiosInstance.post("/orders", {
          userId: user.id,
          items,
          totalAmount: getCartTotal(),
        });

        resetCart();
      } catch (error) {
        console.error("Failed to create order:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (hasRun.current) return;
    hasRun.current = true;
    createOrder();
  }, [cartItems, getCartTotal, resetCart, user]);

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
