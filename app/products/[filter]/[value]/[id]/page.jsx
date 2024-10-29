import clientPromise from "@/lib/database";
import ProductDetailCard from "@/components/ProductDetailCard";
import { ObjectId } from "mongodb";

export default async function ProductDetailPage({ params }) {
  // Await params to ensure they are fully loaded before accessing
  const { id } = await params;

  if (!id) {
    return <p>Product not found.</p>;
  }

  try {
    const client = await clientPromise;
    const db = client.db("tash-mode");

    // Fetch the product by ID
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (product) {
      product._id = product._id.toString();
    } else {
      return <p>Product not found.</p>;
    }

    // Fetch reviews with user details for this product
    const reviews = await db
      .collection("reviews")
      .aggregate([
        { $match: { productId: new ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ])
      .toArray();

    const serializedReviews = reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
      userId: review.userId.toString(),
      productId: review.productId.toString(),
      user: {
        ...review.user,
        _id: review.user._id.toString(),
      },
    }));

    console.log("Product:", product);
    console.log("Serialized Reviews:", serializedReviews);

    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <ProductDetailCard product={product} reviews={serializedReviews} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product or reviews:", error);
    return <p>Something went wrong while loading the product details.</p>;
  }
}
