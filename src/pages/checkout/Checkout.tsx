import styles from "./checkout.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/stores/cartStore";

const registerSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane"),
  lastName: z.string().min(1, "Nazwisko jest wymagane"),
  companyName: z.string().min(1, "Nazwa firmy jest wymagana"),
  email: z.string().email("Nieprawidłowy email"),
  country: z.string().min(1, "Wybierz kraj"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Checkout: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };

  const { getCartTotal } = useCartStore();

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.mainContentRow}>
          <div className={styles.mainContentCol8}>
            <div className={styles.checkoutFormArea}>
              <div className={styles.inputGroup}>
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className={styles.input}
                />
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className={styles.input}
                />
              </div>

              <input
                {...register("companyName")}
                placeholder="Company Name"
                className={styles.input}
              />

              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className={styles.input}
              />

              <select {...register("country")} className={styles.select}>
                <option value="PL">Poland</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
          </div>
          <div className={styles.mainContentCol4}>
            <div className={styles.checkoutSummary}>
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
              <button type="submit" className={styles.checkoutBtn}>
                <a href="/checkout">Checkout</a>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
