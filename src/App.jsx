import React from "react";
import Header from "./components/common/header/Header";
import HomePage from "./components/pages/home/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductDetailPage from "./components/pages/productDetail/ProductDetailPage";
import ShoppingCartPage from "./components/pages/shoppingCart/ShoppingCartPage";
import { CartProvider } from "./components/common/CartContext";

const App = () => {
  return (
    <div className="bg-gray-50">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product-detail/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
};

export default App;