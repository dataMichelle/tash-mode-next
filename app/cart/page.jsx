"use client";
import Cart from "@/components/Cart"; // Adjust the import path if needed
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="container mx-auto p-4 flex space-x-4">
      <div className="w-2/3">
        <Cart />
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center">
        <button
          onClick={handleCheckout}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
