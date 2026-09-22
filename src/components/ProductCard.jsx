import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ imageUrl, name, price, favoriteCount }) {
  const [hasImageError, setHasImageError] = useState(false);

  const shouldShowImage = imageUrl && !hasImageError;

  return (
    <article className="product-card">
      {shouldShowImage ? (
        <img
          className="product-card-image"
          src={imageUrl}
          alt={name}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="product-card-image-fallback">이미지 없음</div>
      )}

      <h3 className="product-card-name">{name}</h3>
      <p className="product-card-price">{price.toLocaleString()}원</p>
      <p className="product-card-favorite">♡ {favoriteCount}</p>
    </article>
  );
}

export default ProductCard;