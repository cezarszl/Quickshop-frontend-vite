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
  const [googleLoading, setGoogleLoading] = useState(false);

  const login = useLoginStore((state) => state.login);
  const loginWithGoogle = useLoginStore((state) => state.loginWithGoogle);
  const error = useLoginStore((state) => state.error);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const syncAfterLogin = useCartStore((state) => state.syncAfterLogin);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Enable real-time validation
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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();

      const user = useLoginStore.getState().user;
      if (user?.id) {
        await syncAfterLogin(user.id);
      }
    } catch (err) {
      console.error("Google login error:", err);
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email address"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              {...register("email")}
              disabled={isLoading || googleLoading}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Password"
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              {...register("password")}
              disabled={isLoading || googleLoading}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          {error && <p className={styles.formError}>{error}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading || googleLoading}
          >
            {isLoading ? (
              <span className={styles.buttonLoader}>
                <span className={styles.loaderDot}></span>
                <span className={styles.loaderDot}></span>
                <span className={styles.loaderDot}></span>
              </span>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.googleContainer}>
          <button
            onClick={handleGoogleLogin}
            className={styles.googleButton}
            disabled={isLoading || googleLoading}
          >
            {googleLoading ? (
              <span className={styles.buttonLoader}>
                <span className={styles.loaderDot}></span>
                <span className={styles.loaderDot}></span>
                <span className={styles.loaderDot}></span>
              </span>
            ) : (
              <>
                <FcGoogle className={styles.googleIcon} />
                Continue with Google
              </>
            )}
          </button>
        </div>

        <div className={styles.registerLink}>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
