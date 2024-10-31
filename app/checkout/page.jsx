import Cart from "@/components/Cart"; // Adjust the import path if needed
import CheckoutForm from "@/components/CheckoutForm"; // Adjust the import path if needed

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4 flex space-x-4">
      <div className="w-1/2">
        <Cart />
      </div>
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;
