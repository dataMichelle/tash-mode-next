// app/cart/page.jsx
"use client";

import { useState } from "react";
import Cart from "@/components/Cart"; // Your existing Cart component
import ShippingInformation from "@/components/ShippingInformation";
import BillingInformation from "@/components/BillingInformation";

const CartPage = () => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [shippingData, setShippingData] = useState({});
  const [billingData, setBillingData] = useState({});

  const handleShippingDataChange = (data) => {
    setShippingData(data);
  };

  const handleBillingDataChange = (data) => {
    setBillingData(data);
  };

  return (
    <div className="flex space-x-8">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <Cart />
      </div>
      <div className="w-2/3">
        <div className="tabs">
          <button
            onClick={() => setActiveTab("shipping")}
            className={`tab ${activeTab === "shipping" ? "active" : ""}`}
          >
            Shipping Information
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`tab ${activeTab === "billing" ? "active" : ""}`}
          >
            Billing Information
          </button>
        </div>
        {activeTab === "shipping" ? (
          <ShippingInformation
            onShippingDataChange={handleShippingDataChange}
          />
        ) : (
          <BillingInformation
            onBillingDataChange={handleBillingDataChange}
            isSameAsShipping={shippingData}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;
