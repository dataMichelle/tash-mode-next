"use client"; // Ensure this component is a client component
import { useState } from "react";

const StripeAccountOnboarding = () => {
  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const accountId = data.accountId;

      const linkResponse = await fetch("/api/account_link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });
      const accountLink = await linkResponse.json();

      // Redirect the user to the account link
      window.location.href = accountLink.url;
    } catch (error) {
      console.error("Error creating Stripe account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Setup Stripe Account</h2>
      <button
        onClick={createAccount}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Stripe Account"}
      </button>
    </div>
  );
};

export default StripeAccountOnboarding;
