"use client";

import { useCart } from "@/context/CartContext"; // Adjust the import path if needed
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
  FUNDING,
} from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    console.log("PayPalScriptProvider is rendering");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const calculatedTax = subtotal * 0.1; // Example tax rate of 10%
    const calculatedShipping = 5.0; // Example flat shipping fee

    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setTotal(subtotal + calculatedTax + calculatedShipping);
  };

  useEffect(() => {
    calculateTotals();
  }, [cartItems, address]);

  const createOrder = (data, actions) => {
    const parsedTotalPrice = parseFloat(total);

    if (isNaN(parsedTotalPrice)) {
      console.error("Invalid totalPrice:", { total });
      return;
    }

    const totalAmount = parsedTotalPrice.toFixed(2);

    if (isNaN(totalAmount)) {
      console.error("Invalid total amount:", totalAmount);
      return;
    }

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalAmount,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      })
      .catch((err) => {
        console.error("Error creating order:", err); // Log any errors
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        alert("Transaction completed by " + details.payer.name.given_name);
      })
      .catch((err) => {
        console.error("Error capturing order:", err); // Log any errors
      });
  };

  const onError = (err) => {
    console.error("PayPal Checkout onError", err);
  };

  const onCancel = () => {
    console.log("PayPal Checkout onCancel");
  };

  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Express Checkout</h2>
        <div className="flex">
          <div className="w-2/5 pr-6">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="flex justify-between mt-2">
              <span>Subtotal:</span>
              <span>${(total - tax - shipping).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2 font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="w-3/5 pl-6">
            <div className="flex flex-col space-y-4">
              <PayPalButtons
                key="paypal"
                style={{ layout: "vertical", height: 45 }}
                fundingSource="paypal"
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
              />
              <PayPalButtons
                key="paylater"
                style={{ layout: "vertical", height: 45 }}
                fundingSource="paylater"
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
              />
              <PayPalButtons
                key="card"
                style={{
                  layout: "vertical",
                  height: 45,
                  color: "black",
                }}
                fundingSource={FUNDING.CARD}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
              />
            </div>
          </div>
        </div>
        {message && <p className="text-red-500 mt-4">{message}</p>}
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="newsOffers"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Email me with news and offers
            </label>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4">Delivery Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address 1
            </label>
            <input
              type="text"
              name="address1"
              value={address.address1}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address 2 (optional)
            </label>
            <input
              type="text"
              name="address2"
              value={address.address2}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP
              </label>
              <input
                type="text"
                name="zip"
                value={address.zip}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </PayPalScriptProvider>
  );
};

export default CheckoutForm;
