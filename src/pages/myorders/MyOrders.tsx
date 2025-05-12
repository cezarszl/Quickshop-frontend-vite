import { useEffect } from "react";
import { useOrderStore } from "@/stores/orderStore";
import { useLoginStore } from "@/stores/loginStore";
import styles from "./myOrders.module.css";

const MyOrders: React.FC = () => {
  const { orders, fetchUserOrders } = useOrderStore();
  const user = useLoginStore((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      fetchUserOrders(user.id);
    }
  }, [user]);

  if (!user) {
    return (
      <p className={styles.message}>
        You need to be logged in to view your orders.
      </p>
    );
  }

  if (orders.length === 0) {
    return <p className={styles.message}>You have no orders yet.</p>;
  }

  return (
    <div className={styles.orderContainer}>
      <h2 className={styles.title}>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
