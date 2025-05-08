import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@/stores/loginStore";
import axiosInstance from "@/helpers/axiosInstance";
import { useCartStore } from "@/stores/cartStore";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const syncAfterLogin = useCartStore((state) => state.syncAfterLogin);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true; // This is to prevent duplicate calls caused by StrictMode

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const userString = params.get("user");

    if (token && refreshToken && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        localStorage.setItem("refreshToken", refreshToken);
        useLoginStore.setState({
          token,
          refreshToken,
          user,
          isLoggedIn: true,
          error: null,
        });

        if (user?.id) {
          console.log("User from Google:", user);
          syncAfterLogin(user.id).finally(() => navigate("/"));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to parse Google callback data", error);
        navigate("/login");
      }
    } else {
      console.error("Missing token or user in callback URL");
      navigate("/login");
    }
  }, [navigate, syncAfterLogin]);

  return <p>Logging in with Google...</p>;
};

export default GoogleCallback;
