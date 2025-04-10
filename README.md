# E-Shopper - React E-commerce Project


A responsive e-commerce web application built with React, featuring product browsing, search functionality, shopping cart management, and a streamlined checkout process.

## 🚀 Features

- **Product Catalog**: Browse through a wide range of products with details
- **Shopping Cart**: Add, update quantities, and remove products from your cart
- **Responsive Design**: Seamlessly works on mobile, tablet, and desktop devices
- **Product Details**: View in-depth information about each product
- **Discount Display**: See available discounts and special offers
- **Rating System**: View product ratings with intuitive star display

## 🛠️ Technologies Used

### Core Technologies
- **React**: Frontend library for building the user interface
- **Vite**: Next generation frontend tooling for faster development
- **React Router**: For handling navigation and routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: Promise-based HTTP client for API requests

### React Features
- **React Hooks**: 
  - `useState`: For managing component state
  - `useEffect`: For handling side effects like API calls
  - `useContext`: For state management across components
- **Context API**: Implementation of shopping cart state management
- **Custom Hooks**: Created to handle cart functionality

### UI Components
- **Lucide React**: Modern icon library
- **React Icons**: Additional icon components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📂 Project Structure

```
e-shopper/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CartContext.js
│   │   │   └── Header.jsx
│   │   └── pages/
│   │       ├── HomePage.jsx
│   │       ├── ShoppingCartPage.jsx
│   │       ├── ProductDetailPage.jsx
│   │       └── NotFoundPage.jsx
│   ├── utils/
│   │   └── Api.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/e-shopper.git
cd e-shopper
```

2. Install dependencies
```bash
npm install
# or 
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 🛒 Cart Functionality

The shopping cart uses React Context API to:
- Track items added to cart
- Calculate total prices
- Apply discounts
- Persist cart data across sessions

### Cart Context Implementation

```jsx
// CartContext.js simplified example
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Add to cart functionality
  const addToCart = (product) => {
    // Implementation
  };
  
  // Update quantity
  const updateQuantity = (productId, change) => {
    // Implementation
  };
  
  // Remove from cart
  const removeFromCart = (productId) => {
    // Implementation  
  };
  
  // Calculate cart total
  const cartTotal = // Implementation
  
  // Calculate discounted total
  const discountedTotal = // Implementation
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      cartTotal,
      discountedTotal,
      cartCount: cartItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
```



