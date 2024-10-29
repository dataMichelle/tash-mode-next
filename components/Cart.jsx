import { useCart } from "@/context/CartContext";
import Image from "next/image";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className="flex items-center mb-4">
            <Image
              src={item.images[0] || "/images/placeholder.png"}
              alt={item.description}
              width={50}
              height={50}
              className="rounded mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.description}</h3>
              <p className="text-gray-700">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
