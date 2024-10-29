// app/api/reviews/route.js
import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { productId, userId, rating, comment } = await req.json();

  if (!productId || !userId || !rating || !comment) {
    return new Response("Missing fields in request body", { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("tash-mode");

    const newReview = {
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
      rating,
      comment,
      date: new Date(),
    };

    const result = await db.collection("reviews").insertOne(newReview);

    return new Response(JSON.stringify(result.ops[0]), { status: 201 });
  } catch (error) {
    return new Response("Error inserting review", { status: 500 });
  }
}
