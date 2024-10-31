"use client";

import { useCart } from "@/context/CartContext"; // Adjust the import path if needed
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for the "Remove" link

const Cart = () => {
  const { cartItems, setCartItems, updateQuantity, removeFromCart } = useCart();

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  const calculateSubtotal = () => {
    const subtotalValue = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(subtotalValue);
  };

  const handleIncrement = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-16 w-16 rounded"
                  />
                  <div className="ml-4">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="ml-4">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="px-2 py-1 bg-gray-200 rounded-l"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center border-t border-b border-gray-200"
                      />
                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="px-2 py-1 bg-gray-200 rounded-r"
                      >
                        +
                      </button>
                      <Link
                        href="#"
                        onClick={() => handleRemove(item._id)}
                        className="ml-4 text-red-500 underline"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="flex justify-between mt-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
