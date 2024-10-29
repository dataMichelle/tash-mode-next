"use client";
import { useCart } from "@/context/CartContext"; // Adjust the import path
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal"; // Import your modal component

const Cart = () => {
  const { cartItems } = useCart();
  const router = useRouter();

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const calculateTotals = () => {
    const subtotalValue = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const calculatedTax = subtotalValue * 0.1; // Example tax rate
    const calculatedShipping = 5.0; // Flat shipping fee

    setSubtotal(subtotalValue);
    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setTotal(subtotalValue + calculatedTax + calculatedShipping);
  };

  const handleCheckout = () => {
    router.push("/cart/checkout"); // Navigate to the checkout page
  };

  const handleAddToCart = (item) => {
    // This function is called whenever an item is added to the cart
    setShowModal(true);
    // Additional logic for adding item to cart...
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
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
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
            <div className="flex justify-between mt-2">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-4 font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}
      {showModal && (
        <Modal
          message="Item added to cart!"
          onClose={() => setShowModal(false)}
          onContinueShopping={() => {
            setShowModal(false);
            router.push("/"); // Redirect to home or shop page
          }}
        />
      )}
    </div>
  );
};

export default Cart;
