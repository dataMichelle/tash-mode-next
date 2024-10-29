import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure your secret key is correct

export async function POST(request) {
  try {
    const { items } = await request.json();

    // Create line items for Stripe Checkout
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name, // Product name
          images: [item.image], // Product image URL
        },
        unit_amount: Math.round(item.price * 100), // Price in cents
      },
      quantity: item.quantity, // Product quantity
    }));

    console.log("Line items being sent to Stripe:", lineItems); // Debugging line

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    // Respond with the session ID
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
