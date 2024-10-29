import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PzhBwEEUXfDhftzarIrHZuQlTazKmTiAXCeqg2wzEGrd4M9kVLhZudmatGlCxqajazD6yQy7cStwYcj3rpyAH8U00Ea5UXH6M",
  {
    apiVersion: "2023-10-16",
  }
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { accountId } = req.body;

    try {
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${req.headers.origin}/refresh/${accountId}`,
        return_url: `${req.headers.origin}/return/${accountId}`,
        type: "account_onboarding",
      });

      res.status(200).json(accountLink);
    } catch (error) {
      console.error("Error creating account link:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
