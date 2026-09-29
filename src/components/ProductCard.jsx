function ProductCard({ image, name, price, favoriteCount }) {
  const fallbackImage = "/images/Img_home_01.png";

  return (
    <article className="product-card">
      <img
        className="product-card-image"
        src={image || fallbackImage}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage;
        }}
      />

      <div className="product-card-info">
        <h3 className="product-card-name">{name}</h3>

        <p className="product-card-price">
          {price.toLocaleString()}원
        </p>

        <div className="product-card-favorite">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
          <span>{favoriteCount}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
