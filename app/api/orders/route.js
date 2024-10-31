// app/api/orders/route.js
import clientPromise from "@/lib/database"; // Adjust the import based on your file structure

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("tash-mode"); // Your actual database name

    // Parse the request body
    const { cart, total } = await req.json();

    // Validate the cart and total
    if (!Array.isArray(cart) || cart.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create order object
    const order = {
      items: cart,
      totalAmount: total,
      createdAt: new Date(),
      // Add additional fields as necessary
    };

    // Insert order into the orders collection
    const result = await db.collection("orders").insertOne(order);

    // Return the inserted order ID
    return new Response(JSON.stringify({ id: result.insertedId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
