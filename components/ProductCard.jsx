import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const primaryImage = product.images[0] || "/images/placeholder.png"; // Fallback if no image is available

  // Join category and culture arrays into single strings
  const categories = Array.isArray(product.category)
    ? product.category.join("-")
    : product.category;

  const cultures = Array.isArray(product.culture)
    ? product.culture.join("-")
    : product.culture;

  return (
    <div className="max-w-xs rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-200">
      <Link href={`/products/${categories}/${cultures}/${product._id}`}>
        <div className="relative w-full h-48">
          <Image
            src={primaryImage}
            alt={product.description}
            layout="fill"
            objectFit="cover"
            className="hover:opacity-90"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.description}
          </h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
