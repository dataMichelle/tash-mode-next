// app/culture/page.jsx
import clientPromise from "@/lib/database";
import CultureCard from "@/components/CultureCard";

export default async function CulturePage() {
  const client = await clientPromise;
  const db = client.db("tash-mode");

  // Fetch unique cultures and the first image associated with each
  const cultures = await db
    .collection("products")
    .aggregate([
      { $unwind: "$culture" }, // Split array of cultures for each product
      {
        $group: {
          _id: "$culture", // Group by culture
          firstImage: { $first: "$images" }, // Get the first image for each culture
        },
      },
    ])
    .toArray();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Shop by Culture</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cultures.map((culture) => (
          <CultureCard
            key={culture._id}
            culture={culture._id}
            image={culture.firstImage[0]}
          />
        ))}
      </div>
    </div>
  );
}
