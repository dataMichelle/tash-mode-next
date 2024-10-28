// app/category/page.jsx
import clientPromise from "@/lib/database";
import CategoryCard from "@/components/CategoryCard";

export default async function CategoryPage() {
  const client = await clientPromise;
  const db = client.db("tash-mode");

  // Fetch unique categories and the first image associated with each
  const categories = await db
    .collection("products")
    .aggregate([
      { $unwind: "$category" }, // Split array of categories for each product
      {
        $group: {
          _id: "$category", // Group by category
          firstImage: { $first: "$images" }, // Get the first image for each category
        },
      },
    ])
    .toArray();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category._id}
            image={category.firstImage[0]}
          />
        ))}
      </div>
    </div>
  );
}
