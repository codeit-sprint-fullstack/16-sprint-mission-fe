import styles from "./ProductCard.module.scss";
import defaultProductImage from "../../assets/images/default-image.png"


const ProductCard = ({ product }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {/* <img   src={product.images?.[0]} alt={product.name} /> */}
        <img src={defaultProductImage} alt={product.name} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>

        <p className={styles.price}>
          {product.price.toLocaleString()}원
        </p>

        <div className={styles.favorite}>
          <span>♡</span>
          {/* <span>{product.favoriteCount}</span> */}
          <span>240</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;