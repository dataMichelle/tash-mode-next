import Image from "next/image";
import Link from "next/link";

export default function CultureCard({ culture, image }) {
  return (
    <Link href={`/products/culture/${encodeURIComponent(culture)}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
        <div className="w-full h-[200px] relative">
          {" "}
          {/* Fixed image container */}
          <Image
            src={image}
            alt={`${culture} culture`}
            layout="fill" // Fill the container
            objectFit="cover" // Crop to fit container dimensions
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{culture}</h2>
        </div>
      </div>
    </Link>
  );
}
