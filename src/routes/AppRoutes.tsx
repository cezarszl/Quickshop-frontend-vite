import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Shop from "@/pages/shop/Shop";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/Checkout";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import GoogleCallback from "@/pages/auth/GoogleCallback";
import MyProfile from "@/pages/myprofile/MyProfile";
import Favorites from "@/pages/favorites/Favorites";
import Search from "@/pages/search/Search";
import Category from "@/pages/category/Category";
import NotFound from "@/pages/notfound/NotFound";
import NewThisWeek from "@/pages/newthisweek/NewThisWeek";
import Product from "@/pages/product/Product";
import SuccessPayment from "@/pages/success-payment/SuccessPayment";
import MyOrders from "@/pages/myorders/MyOrders";

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
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/wishlist" element={<Favorites />} />
      <Route path="/search" element={<Search />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/new-this-week" element={<NewThisWeek />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/success/" element={<SuccessPayment />} />
    </Routes>
  );
};

export default AppRoutes;
