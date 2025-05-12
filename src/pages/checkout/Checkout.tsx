import { useState } from "react";
import styles from "./checkout.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/stores/cartStore";
import axiosInstance from "@/helpers/axiosInstance";
import { FaSpinner } from "react-icons/fa";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Checkout: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const { cartItems, getCartTotal } = useCartStore();

  const isCartEmpty = cartItems.length === 0;

  const onSubmit = async (data: RegisterForm) => {
    setIsSubmitting(true);
    try {
      const formattedCart = cartItems.map((item) => ({
        name: item.productDetails.name,
        price: item.productDetails.price,
        quantity: item.quantity,
      }));

      const response = await axiosInstance.post("/payments/checkout-session", {
        customer: data,
        cart: formattedCart,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Stripe checkout failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.mainContentRow}>
          <div className={styles.mainContentCol8}>
            <div className={styles.checkoutFormArea}>
              <div className={styles.inputGroup}>
                <div>
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className={styles.input}
                  />
                  {errors.firstName && (
                    <p style={{ color: "red", fontSize: "0.8rem", margin: 0 }}>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className={styles.input}
                  />
                  {errors.lastName && (
                    <p style={{ color: "red", fontSize: "0.8rem", margin: 0 }}>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <input
                {...register("companyName")}
                placeholder="Company Name (Optional)"
                className={styles.input}
              />

              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className={styles.input}
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "0.8rem", margin: 0 }}>
                  {errors.email.message}
                </p>
              )}

              <select {...register("country")} className={styles.select}>
                <option value="">Select Country</option>
                <option value="PL">Poland</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
              {errors.country && (
                <p style={{ color: "red", fontSize: "0.8rem", margin: 0 }}>
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.mainContentCol4}>
            <div className={styles.checkoutSummary}>
              <h5>Cart Total</h5>
              <ul className={styles.summaryTable}>
                <li>
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </li>
                <li>
                  <span>Delivery:</span>
                  <span>Free</span>
                </li>
                <li>
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </li>
              </ul>
              {isCartEmpty && (
                <p className={styles.warning}>
                  Your cart is empty. Add products before proceeding to
                  checkout.
                </p>
              )}
              <button
                type="submit"
                disabled={isCartEmpty || isSubmitting}
                className={styles.checkoutBtn}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner
                      style={{
                        marginRight: "10px",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
