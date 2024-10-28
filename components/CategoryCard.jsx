import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category, image }) {
  return (
    <Link href={`/products/category/${category}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
        <div className="w-full h-[200px] relative">
          {" "}
          {/* Container for fixed image size */}
          <Image
            src={image}
            alt={`${category} category`}
            layout="fill" // Fill the container with the image
            objectFit="cover" // Crop image to fit container dimensions
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{category}</h2>
        </div>
      </div>
    </Link>
  );
}
