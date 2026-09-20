function ProductCard({ product }) {
  const imageUrl = product.images?.[0]

  return (
    <article className="product-card">
      <div className="product-image">
        {imageUrl ? <img src={imageUrl} alt={product.name} /> : <span>이미지 없음</span>}
      </div>
      <h3>{product.name}</h3>
      <strong>{product.price?.toLocaleString()}원</strong>
      <p>♡ {product.favoriteCount?.toLocaleString() ?? 0}</p>
    </article>
  )
}

export default ProductCard
