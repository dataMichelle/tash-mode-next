import ProductCard from "@/components/ProductCard";
import clientPromise from "@/lib/database";

export default async function FilteredProductsPage({ params }) {
  const { filter, value } = await params;

  const client = await clientPromise;
  const db = client.db("tash-mode");

  // Decode value to handle URL-encoded spaces
  const decodedValue = decodeURIComponent(value);
  console.log("Decoded filter:", filter); // Log filter type
  console.log("Decoded value:", decodedValue); // Log decoded value

  // Use case-insensitive matching with `$regex`
  const query = {};
  if (filter && decodedValue) {
    query[filter] = { $regex: new RegExp(`^${decodedValue}$`, "i") };
  }

  const products = await db.collection("products").find(query).toArray();
  console.log("Filtered products:", products);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Products for {filter}: {decodedValue}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
