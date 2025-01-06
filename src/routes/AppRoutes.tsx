import { Routes, Route } from "react-router-dom";
import Home from "@/home/Home";
import Shop from "@/shop/Shop";
import Cart from "@/cart/Cart";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
