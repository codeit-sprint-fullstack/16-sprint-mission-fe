// src/components/ProductList.jsx
import React from "react";

import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;