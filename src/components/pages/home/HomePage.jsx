import React, { useEffect, useState } from 'react';
import { productsApi } from '../../../utils/Api';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../common/CartContext'; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productsApi();
            setProducts(response.data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const renderRating = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return stars;
    };

    const handleAddToCart = (product) => {
        addToCart(product); 
    };

    const handleViewDetails = (id) => {
        navigate(`/product-detail/${id}`);
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className='w-[90%] lg:w-[80%] flex-col justify-center items-center'>
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 mt-4 text-gray-800">Featured Products</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-[100vh]">
                    <ImSpinner8 className="animate-spin text-4xl text-red-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products && products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                            <div className="relative h-56 overflow-hidden group">
                                <img 
                                    src={product.thumbnail || product.images?.[0]} 
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                />
                                {product.discountPercentage > 0 && (
                                    <span className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                                        {Math.round(product.discountPercentage)}% OFF
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">{product.title}</h2>
                                <p className="text-sm text-gray-600 mb-3 font-medium">{product.brand}</p>
                                <div className="flex items-center mb-3">
                                    <div className="flex mr-2">
                                        {renderRating(product.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">({product.rating})</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                                        {product.availabilityStatus === "Low Stock" && (
                                            <p className="text-xs text-orange-600 mt-1 font-semibold">Only {product.stock} left!</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-1 lg:gap-3">
                                    <button
                                        onClick={() => handleViewDetails(product.id)}
                                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-2 rounded-lg transition-colors duration-200 mt-2 md:mt-0"
                                    >
                                        <FaEye className="mr-2" /> View Details
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-lg transition-colors duration-200 mt-2 md:mt-0"
                                    >
                                        <FaShoppingCart className="mr-2" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default HomePage;