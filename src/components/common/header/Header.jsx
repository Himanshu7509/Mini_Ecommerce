import React, { useState } from "react";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  
  const navigate = useNavigate();

  const formattedCartCount = (cartCount || 0).toString();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-xl md:text-2xl font-extrabold text-rose-400 bg-rose-100 rounded w-8 h-8 flex items-center justify-center">
            E
          </div>
          <span className="text-xl md:text-2xl font-bold text-gray-800">
            Shopper
          </span>
        </Link>
        <div className="hidden md:flex items-center border border-gray-200 rounded-md w-1/2 max-w-xl">
          <input
            type="text"
            placeholder="Search for products"
            className="flex-grow px-4 py-2 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button className="px-4 text-rose-400">
            <Search size={18} />
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-1 border border-gray-200 px-2 py-1 rounded-md text-rose-400">
            <Heart size={18} />
            <span className="text-sm text-gray-700">0</span>
          </div>
          <button 
            onClick={handleCartClick}
            className="flex items-center space-x-1 border border-gray-200 px-2 py-1 rounded-md text-rose-400 hover:bg-gray-50"
          >
            <ShoppingCart size={18} />
            <span className="text-sm text-gray-700">{formattedCartCount}</span>
          </button>
        </div>
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center border border-gray-200 rounded-md w-full">
          <input
            type="text"
            placeholder="Search for products"
            className="flex-grow px-4 py-2 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button className="px-4 text-rose-400">
            <Search size={18} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">Wishlist</span>
            <div className="flex items-center space-x-1 text-rose-400">
              <Heart size={18} />
              <span className="text-sm text-gray-700">0</span>
            </div>
          </div>
          <div 
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={handleCartClick}
          >
            <span className="text-gray-700">Cart</span>
            <div className="flex items-center space-x-1 text-rose-400">
              <ShoppingCart size={18} />
              <span className="text-sm text-gray-700">{formattedCartCount}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;