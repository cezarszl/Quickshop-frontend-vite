import { useEffect } from "react";
import { useOrderStore } from "@/stores/orderStore";
import { useLoginStore } from "@/stores/loginStore";
import styles from "./myOrders.module.css";
import { Link } from "react-router-dom";

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
          <div className={styles.orderHeader}>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
            </p>
          </div>

          <ul className={styles.productList}>
            {order.items.map((item, index) => (
              <li key={index} className={styles.productItem}>
                <div className={styles.productDetails}>
                  <img
                    src={item.productDetails?.imageUrl}
                    alt={item.productDetails?.name}
                    className={styles.productImage}
                  />
                  <div>
                    <Link to={`/product/${item.productDetails?.id}`}>
                      <h4>{item.productDetails?.name}</h4>
                    </Link>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.productDetails?.price.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
