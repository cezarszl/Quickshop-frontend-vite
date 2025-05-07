// Login.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginStore } from "@/stores/loginStore";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useCartStore } from "@/stores/cartStore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = useLoginStore((state) => state.login);
  const loginWithGoogle = useLoginStore((state) => state.loginWithGoogle);
  const error = useLoginStore((state) => state.error);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const syncAfterLogin = useCartStore((state) => state.syncAfterLogin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);

      const user = useLoginStore.getState().user;
      if (user?.id) {
        await syncAfterLogin(user.id);
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email address"
            className={styles.input}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <div className={styles.Google}>
        <button onClick={loginWithGoogle} className={styles.googleButton}>
          <FcGoogle className={styles.googleIcon} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
