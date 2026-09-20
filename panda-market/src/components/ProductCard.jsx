import styles from './ProductCard.module.scss';

// 상품 한 개의 이미지, 이름, 가격, 좋아요 수를 보여 주는 카드
function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.images[0]} alt={product.name} />
      <p className={styles.name}>{product.name}</p>
      <p className={styles.price}>{product.price.toLocaleString()}원</p>
      <p className={styles.likes}>♡ {product.favoriteCount}</p>
    </div>
  );
}

export default ProductCard;
