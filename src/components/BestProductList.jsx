// src/components/BestProductList.jsx

import ProductCard from "./ProductCard";

function BestProductList({ products }) {
  return (
    <div className="best-product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default BestProductList;