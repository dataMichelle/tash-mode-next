// components/Reviews.jsx
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Reviews = ({ reviews }) => {
  const [showReviews, setShowReviews] = useState(false);

  // Calculate the average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i < rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      <div className="flex items-center mb-4">
        {renderStars(averageRating)}
        <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
      </div>

      {/* Show/Hide Reviews Button */}
      <button
        onClick={() => setShowReviews(!showReviews)}
        className="text-blue-500 hover:text-blue-700 transition-colors mb-4"
      >
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>

      {/* Individual User Reviews */}
      {showReviews && (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-t pt-2">
              <p className="font-semibold">{review.user.name}</p>
              <div className="flex items-center mb-1">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {review.comment}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
