// Register.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginStore } from "@/stores/loginStore";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import styles from "./register.module.css";
import axios from "axios";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const registerUser = useLoginStore((state) => state.register);
  const loginWithGoogle = useLoginStore((state) => state.loginWithGoogle);
  const error = useLoginStore((state) => state.error);
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate("/login");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setError("email", {
          type: "manual",
          message: "Email is already registered",
        });
      } else {
        console.error("Registration failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Google login error:", err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.registerTitle}>Create Account</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Name"
              className={`${styles.input} ${
                errors.name ? styles.inputError : ""
              }`}
              {...register("name")}
              disabled={isLoading || googleLoading}
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              autoComplete="off"
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
              autoComplete="off"
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
              "Register"
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

        <div className={styles.loginLink}>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
