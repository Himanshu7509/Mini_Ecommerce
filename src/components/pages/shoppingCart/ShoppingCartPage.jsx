import React from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, Tag } from "lucide-react";
import { useCart } from '../../common/CartContext';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart,
    cartTotal,
    discountedTotal
  } = useCart();

  const handleQuantityChange = (productId, change) => {
    updateQuantity(productId, change);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <button 
          onClick={handleContinueShopping}
          className="bg-rose-500 hover:bg-rose-600 transition-colors text-white py-2 px-6 rounded-lg shadow"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Products
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Quantity
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Total
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600 sr-only">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 rounded-l border border-gray-300 bg-gray-50 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="px-4 py-1 border-y border-gray-300 min-w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 rounded-r border border-gray-300 bg-gray-50 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5 text-gray-500 hover:text-rose-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
       
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Have a Coupon?
            </h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Tag className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              <button className="bg-rose-500 hover:bg-rose-600 transition-colors text-white px-4 py-2 rounded-r font-medium">
                Apply
              </button>
            </div>
          </div>

        
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">
                  -${(cartTotal - discountedTotal).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3"></div>
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>${(discountedTotal + 10).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-rose-500 hover:bg-rose-600 transition-colors text-white py-3 rounded-lg font-medium shadow-sm">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;