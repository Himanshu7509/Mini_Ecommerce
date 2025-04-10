import React from "react";

const CustomerReview = ({ reviews, renderStars }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <div 
          key={index} 
          className="border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {renderStars(review.rating || 5)}
            </div>
            <p className="ml-2 text-sm text-gray-500">{review.rating || 5} out of 5 stars</p>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900">{review.title || 'Review'}</h3>
          
          <p className="mt-2 text-gray-600 line-clamp-3">{review.content || 'No content provided'}</p>
          
          <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
            <span>By {review.user || 'Anonymous'}</span>
            <span>{new Date(review.date || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerReview;