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
  }, [user, fetchUserOrders]);

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.messageCard}>
            <h2 className={styles.title}>My Orders</h2>
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
              <p>You need to be logged in to view your orders.</p>
              <Link to="/login" className={styles.primaryButton}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.messageCard}>
            <h2 className={styles.title}>My Orders</h2>
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <p>You have no orders yet.</p>
              <Link to="/" className={styles.primaryButton}>
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>My Orders</h2>

        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                  <span className={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className={styles.orderTime}>
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className={styles.orderDetails}>
                  <div className={styles.orderDetail}>
                    <span className={styles.detailLabel}>Order ID</span>
                    <span className={styles.detailValue}>
                      {String(order.id).substring(0, 8)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.productList}>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.productItem}>
                    <div className={styles.productImageContainer}>
                      <img
                        src={item.productDetails?.imageUrl}
                        alt={item.productDetails?.name}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <Link
                        to={`/product/${item.productDetails?.id}`}
                        className={styles.productName}
                      >
                        {item.productDetails?.name}
                      </Link>
                      <div className={styles.productMeta}>
                        <span className={styles.productQuantity}>
                          Qty: {item.quantity}
                        </span>
                        <span className={styles.productPrice}>
                          ${item.productDetails?.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.orderSummary}>
                <div className={`${styles.summaryItem} ${styles.summaryTotal}`}>
                  <span>Order Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
