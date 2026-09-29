import styles from "./ProductCard.module.scss";

function ProductCard({ product }) {
  // const imageUrl = product.images?.[0];
  const imageUrl = "/images/default-product.png";

  const price = Number(product.price ?? 0).toLocaleString("ko-KR");

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} loading="lazy" />
        ) : (
          <div className={styles.noImage}>이미지 없음</div>
        )}
      </div>

      <h3 className={styles.name}>{product.name}</h3>

      <p className={styles.price}>{price}원</p>

      <p className={styles.favorite}>
        <span aria-hidden="true">♡</span>
        {product.favoriteCount ?? 0}
      </p>
    </article>
  );
}

export default ProductCard;
