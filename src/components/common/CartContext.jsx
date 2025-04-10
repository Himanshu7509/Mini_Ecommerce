import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return parsedCart.map(item => ({
        ...item,
        quantity: item.quantity || 1,
        total: (item.quantity || 1) * item.price
      }));
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {

      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
       
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
          total: (updatedItems[existingItemIndex].quantity + 1) * updatedItems[existingItemIndex].price
        };
        return updatedItems;
      } else {
        return [...prevItems, { 
          ...product, 
          quantity: 1, 
          total: product.price 
        }];
      }
    });
  };

  const updateQuantity = (productId, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            total: item.price * newQuantity
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };


  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  
  const cartTotal = cartItems.reduce((total, item) => {
    const itemTotal = item.total || (item.price * (item.quantity || 1));
    return total + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);
  
  const discountedTotal = cartTotal * 0.9;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
      discountedTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);