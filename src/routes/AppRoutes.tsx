import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Shop from "@/pages/shop/Shop";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/Checkout";
import Login from "@/pages/login/Login";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
