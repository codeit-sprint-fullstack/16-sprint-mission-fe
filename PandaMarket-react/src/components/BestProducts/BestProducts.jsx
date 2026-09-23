// ======================================================
// src/components/BestProducts/BestProducts.jsx
// 베스트 상품 영역을 담당하는 컴포넌트
//
// 하는 일:
// 1. useProducts 훅을 사용해서 베스트 상품 데이터를 가져옴
// 2. 데이터를 가져오는 중이면 "로딩 중"을 보여줌
// 3. 요청에 실패하면 에러 메시지를 보여줌
// 4. 데이터를 다 가져오면
//    products를 map으로 반복하면서
//    상품 하나씩 ProductCard에게 props로 내려줌
// ======================================================
//
// ======================================================
// 1. 필요한 파일 가져오기
// ======================================================
// 상품 데이터를 서버에서 가져오는 커스텀 훅
import useProducts from "../../hooks/useProducts";
// 상품 "한 장"을 보여주는 컴포넌트
import ProductCard from "../ProductCard/ProductCard";
// 이 컴포넌트 전용 SCSS
import styles from "./BestProducts.module.scss";

function BestProducts() {
  // ====================================================
  // 2. useProducts 훅 사용
  // useProducts 훅한테 **“이 조건으로 상품 가져와줘”**라고 요청하는 부분
  // ====================================================
  // useProducts 안에서는 마지막에 보통 이런 식으로 return함
  // return { products, totalCount, isLoading, error, };
  //
  const { products, isLoading, error } = useProducts({
    page: 1, // 첫 번째 페이지
    pageSize: 4, // 상품 4개만 가져오기
    orderBy: "favorite", // 좋아요 순으로 정렬
    keyword: "", // 검색어 없음
  });
  //
  // ====================================================
  // 3. 화면 만들기
  // ====================================================
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>베스트 상품</h2>

      {/* 로딩 중일 때  */}
      {/* &&: 왼쪽값이 true면 오른쪽에 있는 걸 보여준다 */}
      {isLoading && <p className={styles.message}>상품을 불러오는 중입니다.</p>}

      {/* 에러 일 때  */}
      {/* &&: 왼쪽값이 true면 오른쪽에 있는 걸 보여준다 */}
      {error && <p className={styles.error}>{error}</p>}

      {/* 로딩도 끝났고, 에러도 없을 때 -> 실제 상품 목록 보여줌 */}
      {/* !isLoading→ 로딩 중이 아니다 / !error→ 에러가 없다 */}
      {!isLoading && !error && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
            // key={product.id}는 React가 각 카드를 구분하려고 붙이는 번호표
            //product={product}는 지금 꺼낸 상품 한 개를 자식 ProductCard한테 보내주는 것
            // product는 props 이름이고, 오른쪽 product는 map으로 지금 꺼낸 상품 데이터 한 개
          ))}
        </div>
      )}

      {/*   // products가 이런 배열이면          
            // products = [
            //   { id: 1, name: "아이폰" },
            //   { id: 2, name: "맥북" },
            //   { id: 3, name: "에어팟" },
            //   { id: 4, name: "아이패드" }
            // ]
      
      // map은 상품을 하나씩 꺼냄
      // 첫 번째 반복 product = { id: 1, name: "아이폰" }
      // 두 번째 반복 product = { id: 2, name: "맥북" }
      */}
    </section>
  );
}

export default BestProducts;
