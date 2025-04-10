import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="text-6xl font-extrabold text-rose-400 bg-rose-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              404
            </div>
            <ShoppingBag className="absolute -bottom-2 -right-2 w-8 h-8 text-rose-500" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 w-full md:w-auto transition-colors text-white py-3 px-6 rounded-lg font-medium shadow-sm"
          >
            <ShoppingBag className="mr-2 w-5 h-5" />
            Continue Shopping
          </Link>
          
          <div className="flex justify-center">
            <Link 
              to="/"
              className="inline-flex items-center text-rose-500 hover:text-rose-600 font-medium"
            >
              <ArrowLeft className="mr-1 w-4 h-4" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;