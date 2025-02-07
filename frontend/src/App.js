import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Products from "./components/products";
import About from "./components/about";
import Contact from "./components/contact";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import SellerSignup from "./components/auth/seller-register";
import SellerLogin from "./components/auth/seller-login";
import ProductDetails from "./components/productDetails";
import Cart from "./components/cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/seller-register" element={<SellerSignup />} />
        <Route path="/auth/seller-login" element={<SellerLogin />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
