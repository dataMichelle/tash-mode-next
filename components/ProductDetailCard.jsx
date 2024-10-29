"use client";
import Image from "next/image";
import { useState } from "react";
import Reviews from "@/components/Reviews";
import ReviewForm from "@/components/ReviewForm";
import { useCart } from "@/context/CartContext"; // Adjust the path as necessary

const ProductDetailCard = ({ product, reviews: initialReviews, userId }) => {
  const { addToCart } = useCart(); // Get addToCart from context
  const [reviews, setReviews] = useState(initialReviews);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      images: product.images,
      // Add any other product details you need
    };

    addToCart(itemToAdd); // Add item to the cart using context
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleNewReview = (newReview) => {
    setReviews([newReview, ...reviews]); // Add the new review to the top of the list
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-1/2">
          <Image
            src={product.images[0] || "/images/placeholder.png"}
            alt={product.description}
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* Add to Cart Section */}
            <div className="mt-4">
              <label htmlFor="quantity" className="mr-2 text-gray-700">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 border rounded p-1"
                min="1"
              />
              <button
                onClick={handleAddToCart}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Review Form */}
            <ReviewForm
              productId={product._id}
              userId={userId}
              onSubmit={handleNewReview}
            />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ProductDetailCard;
