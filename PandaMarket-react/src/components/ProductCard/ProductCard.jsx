// ======================================================
// src/components/ProductCard/ProductCard.jsx
// 상품 카드 한 장만 담당
// 베스트 상품에서도 사용하고
// 판매 중인 상품 목록에서도 똑같이 재사용할 수 있음
// ======================================================
import styles from "./ProductCard.module.scss";
//
//
// ======================================================
// 1. ProductCard 컴포넌트 만들기
// ======================================================
// 부모인 BestProducts나 SellingProducts가 props로 내려준 product
// 이렇게 내려줬음: product={product}
// {products.map((product) => (
// <ProductCard  key={product.id} product={product} /> ))}
function ProductCard({ product }) {
  // ======================================================
  // 2. 상품 이미지 꺼내기
  // ======================================================
  // images는 배열이므로 카드에서는 첫 번째 사진만 사용
  // ?.를 쓴 이유는 images가 없을 수도 있다.
  // "상품 이미지가 있으면 첫 번째 이미지를 가져오고, 없으면 undefined 에러 내지 말자."
  const imageUrl = product.images?.[0];

  // ======================================================
  // 3. 가격을 보기 좋게 만들기
  // ======================================================
  // product.price ?? 0
  // → 가격이 있으면 그 가격 사용
  // → null 또는 undefined면 0 사용
  // ?? 는 "왼쪽 값이 null 또는 undefined면 오른쪽 값을 써"

  // .toLocaleString("ko-KR") → 한국식으로 천 단위 콤마 찍기
  const price = Number(product.price ?? 0).toLocaleString("ko-KR");
  //
  //
  // ======================================================
  // 4. 실제 화면 만들기
  // ======================================================
  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {/*  조건 ? 참일 때 : 거짓일 때
            이미지가 있으면 사진을 보여주고, 
            없으면 “이미지 없음”을 보여주는 삼항연산자 */}
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
        {/* ??는 null이나 undefined일 때만 오른쪽 값을 사용 */}
        {/* 좋아요 개수가 없을 수도 있으니까, 없으면 0으로 보여주자 */}
        {/* favoriteCount가 있으면  →  그 숫자를 보여줌 */}
        {/* favoriteCount가 null 또는 undefined면 → 0을 보여줌 */}
        {product.favoriteCount ?? 0}
      </p>
    </article>
  );
}

export default ProductCard;
