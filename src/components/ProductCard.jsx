import styles from "./ProductCard.module.scss";

function ProductCard({ product }) {
  const { name, price, images, favoriteCount } = product;

  return (
    <div className={styles.card}>
      <img src={images[0] || "/default-image.png"} alt={name} />
      <h3>{name}</h3>
      <p className={styles.price}>{price.toLocaleString()}원</p>
      <span>❤️ {favoriteCount}</span>
    </div>
  );
}
export default ProductCard;