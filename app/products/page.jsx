"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

// Function to fetch all products
async function fetchAllProducts() {
  const res = await fetch("/api/products");
  return res.json();
}

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    }
    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
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
