import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PzhBwEEUXfDhftzarIrHZuQlTazKmTiAXCeqg2wzEGrd4M9kVLhZudmatGlCxqajazD6yQy7cStwYcj3rpyAH8U00Ea5UXH6M",
  {
    apiVersion: "2023-10-16",
  }
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        capabilities: {
          transfers: { requested: true },
        },
      });

      res.status(200).json({ accountId: account.id });
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
