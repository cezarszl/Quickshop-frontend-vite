import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Shop from "@/pages/shop/Shop";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/Checkout";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import GoogleCallback from "@/pages/auth/GoogleCallback";
import Profile from "@/pages/profile/Profile";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
