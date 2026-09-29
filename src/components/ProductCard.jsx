// ProductCard.jsx

function ProductCard({ product }) {
return (
<article className="product-card">
<img
src={product.images?.[0]}
alt={product.name}
className="product-image"
/>

<h3>{product.name}</h3>

<strong>
{product.price?.toLocaleString()}원
</strong>

<p>
♡ {product.favoriteCount}
</p>
</article>
);
}

export default ProductCard;