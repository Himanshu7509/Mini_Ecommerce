import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productsDetailApi } from "../../../utils/Api";
import { Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import CustomerReview from "./customerReviews/CustomerReview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ImSpinner8 } from "react-icons/im";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../../../components/common/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsDetailApi(id);
      console.log(response.data);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const discountedPrice = 
      product.price - (product.price * product.discountPercentage) / 100;

    const cartItem = {
      id: product.id,
      title: product.title,
      price: discountedPrice,
      thumbnail: product.thumbnail,
      brand: product.brand,
      quantity: quantity,
      total: discountedPrice * quantity
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(); 
    navigate('/cart'); 
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-5 h-5 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <ImSpinner8 className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Product not found</p>
      </div>
    );
  }

  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="lg:max-w-lg lg:self-start">
          <div className="rounded-lg overflow-hidden mb-4">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full h-96"
            >
              {productImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="flex-col justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
            <span className="inline-flex mt-2 items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {product.availabilityStatus}
            </span>
          </div>

          <div className="mt-3">
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-gray-500">SKU: {product.sku}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {product.rating} out of 5 stars
            </p>
            <span className="ml-4 text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
              {product.reviews?.length || 0} reviews
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <p className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </p>
              {product.discountPercentage > 0 && (
                <>
                  <p className="ml-3 text-lg line-through text-gray-500">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                    Save {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-2 text-base text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">
                Quantity
              </span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 border-r border-gray-300"
                >
                 <FaMinus />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center py-1 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 border-l border-gray-300"
                >
                  <FaPlus/>
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-900 w-32">
                In Stock:
              </span>
              <span className="text-sm text-gray-700">
                {product.stock} units
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-900 w-32">
                Min. Order:
              </span>
              <span className="text-sm text-gray-700">
                {product.minimumOrderQuantity} units
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-900 w-32">
                Dimensions:
              </span>
              <span className="text-sm text-gray-700">
                {product.dimensions?.width || 0} ×{" "}
                {product.dimensions?.height || 0} ×{" "}
                {product.dimensions?.depth || 0} cm
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-900 w-32">
                Weight:
              </span>
              <span className="text-sm text-gray-700">{product.weight} g</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-900 w-32">
                Tags:
              </span>
              <div className="flex flex-wrap gap-1">
                {product.tags &&
                  product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleAddToCart}
              type="button"
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-5 w-5 hidden sm:block" />
              Add to Cart
            </button>
           
            <button
              onClick={handleBuyNow}
              type="button"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-md hover:bg-gray-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-rose-300 rounded-lg p-6 shadow-sm transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-red-900">
                Fast Shipping
              </h3>
            </div>
            <p className="text-red-800">{product.shippingInformation}</p>
          </div>

          <div className="border border-rose-300 rounded-lg p-6 shadow-sm transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-rose-100  p-3 rounded-full">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-red-900">
                Product Warranty
              </h3>
            </div>
            <p className="text-red-800">{product.warrantyInformation}</p>
          </div>

          <div className="border border-rose-300 rounded-lg p-6 shadow-sm transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <RotateCcw className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-red-900">
                Easy Returns
              </h3>
            </div>
            <p className="text-red-800">{product.returnPolicy}</p>
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
          <CustomerReview reviews={product.reviews} renderStars={renderStars} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;