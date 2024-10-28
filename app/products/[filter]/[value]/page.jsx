// app/products/[filter]/[value]/page.js
"use client";

import { useEffect, useState } from "react";

async function fetchFilteredProducts(filter, value) {
  const res = await fetch(`/api/products?${filter}=${value}`);
  return res.json();
}

export default function FilteredProductsPage({ params }) {
  const { filter, value } = params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const fetchedProducts = await fetchFilteredProducts(filter, value);
      setProducts(fetchedProducts);
    }
    loadProducts();
  }, [filter, value]);

  return (
    <div>
      <h1>
        Products for {filter}: {value}
      </h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
