import { NextResponse } from "next/server";
import clientPromise from "@/lib/database";

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("tash-mode");

    // Await the params promise
    const { filter, value } = await params;

    console.log("Received filter:", filter); // Log filter type
    console.log("Received value:", value); // Log filter value

    // Initialize the query object
    const query = {};

    // Apply filtering based on provided filter and value, using case-insensitive regex for arrays
    if (filter && value) {
      if (filter === "category" || filter === "culture") {
        query[filter] = { $regex: new RegExp(`^${value}$`, "i") };
      } else {
        query[filter] = value;
      }
    }

    console.log("Constructed query:", JSON.stringify(query, null, 2)); // Log the constructed query

    const products = await db.collection("products").find(query).toArray();
    console.log("Filtered products:", products); // Log products returned by filter
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
