// Register.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginStore } from "@/stores/loginStore";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // ikona Google
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

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          {...register("name")}
        />
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          autoComplete="off"
          {...register("email")}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          className={styles.input}
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
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

export default Register;
