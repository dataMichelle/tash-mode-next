// components/CheckoutForm.jsx
"use client";

import { useCart } from "@/context/CartContext"; // Adjust the import path

const CheckoutForm = () => {
  const { cartItems } = useCart();

  const handleSubmit = (event) => {
    event.preventDefault();
    // For now, just log the cart items
    console.log("Cart items:", cartItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <button type="submit">Proceed to Checkout</button>
    </form>
  );
};

export default CheckoutForm;
