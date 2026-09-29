function ProductCard({ image, name, price }) {
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
      </div>
    </article>
  );
}

export default ProductCard;