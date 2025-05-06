import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@/stores/loginStore";
import axiosInstance from "@/helpers/axiosInstance";

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userString = params.get("user");

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));

        useLoginStore.setState({
          token,
          user,
          isLoggedIn: true,
          error: null,
        });

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        navigate("/");
      } catch (error) {
        console.error("Failed to parse Google callback data", error);
        navigate("/login");
      }
    } else {
      console.error("Missing token or user in callback URL");
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging in with Google...</p>;
};

export default GoogleCallback;
