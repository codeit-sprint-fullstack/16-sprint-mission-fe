// ======================================================
// src/components/SellingProducts/SellingProducts.jsx
// "판매 중인 상품" 영역을 담당하는 컴포넌트
//
// 하는 일:
// 1. 검색어 입력 관리
// 2. 정렬 방식 관리
// 3. 현재 페이지 관리
// 4. useProducts로 상품 요청
// 5. 상품 목록 보여주기
// 6. Pagination 보여주기
// ======================================================
// React의 State를 사용하기 위해 가져옴
import { useState } from "react";

// 상품 데이터를 가져오는 커스텀 훅
import useProducts from "../../hooks/useProducts";

// 상품 카드 한 장 보여주는 컴포넌트
import ProductCard from "../ProductCard/ProductCard";

// 페이지 번호 보여주는 컴포넌트
import Pagination from "../Pagination/Pagination";

// 이 컴포넌트 전용 스타일
import styles from "./SellingProducts.module.scss";

// ======================================================
// 1. 한 페이지에 보여줄 상품 개수
// ======================================================
// 예: 1페이지 → 상품 10개
//     2페이지 → 다음 상품 10개
//     3페이지 → 다음 상품 10개
const PAGE_SIZE = 10;

function SellingProducts() {
  // ====================================================
  // 2. 검색창에 "지금 입력 중인 값"
  // 왜 State로 관리??,
  // 검색창에 글자를 입력할 때마다 화면에 보이는 값이 바뀌기 때문
  // ====================================================
  // 검색창에 아이폰 입력함 ,
  // searchText = "아이폰", setSearchText→ searchText를 바꾸는 함수
  // searchText → 현재 검색창에 적힌 글자
  // setSearchText → 검색창 글자를 바꾸는 함수
  // 처음에는 아무것도 안 적혀 있어서 ""
  const [searchText, setSearchText] = useState("");

  //------------------------------------------
  // 💡궁금증 : searchText와 searchKeyword를 왜 따로 만들었냐?
  // searchText    → 사용자가 입력하고 있는 글자  = 입력용
  // searchKeyword → 실제 API 요청에 사용할 검색어  = 요청용 // 검색 버튼을 눌렀을 때만 요청함
  //------------------------------------------

  // ====================================================
  // 3. 실제 서버  API 요청에 사용하는 검색어
  // 검색어가 바뀌면 새로운 상품을 다시 받아오고
  // 화면의 상품 목록도 바뀌기 때문에 State로 관리
  // ====================================================
  // searchKeyword → 실제 API 요청에 사용할 검색어
  // setSearchKeyword → 검색어를 바꾸는 함수
  const [searchKeyword, setSearchKeyword] = useState("");

  // ====================================================
  // 4. 현재 정렬 방식 - 상품을 어떤 순서로 보여줄지 기억하는 State
  // ====================================================
  // orderBy → 현재 정렬 방식, setOrderBy→ 정렬 방식을 바꾸는 함수
  // 초기값은 "recent"  →  처음에는 최신순으로 보여주겠다는 뜻
  // 좋아요순으로 바꾸면:
  // orderBy가 "favorite"로 바뀌고, 그 기준으로 상품을 다시 받아옴
  const [orderBy, setOrderBy] = useState("recent");

  // ====================================================
  // 5. 현재 페이지 - 지금 몇 페이지를 보고 있는지 기억하는 State
  // ====================================================
  // page → 현재 페이지 번호,  setPage → 페이지 번호를 바꾸는 함수
  // 2페이지를 누르면: page가 2로 바뀌고, 2페이지 상품을 다시 받아옴 (화면바낌)
  const [page, setPage] = useState(1);

  // ====================================================
  // 6. useProducts 훅으로부터 상품 데이터 가져오기
  // ====================================================
  // useProducts 훅이 돌려준 값을 받아오는 것: products, totalCount, isLoading, error
  // useProducts 훅한테 보내는 값: page, pageSize, orderBy, keyword
  const { products, totalCount, isLoading, error } = useProducts({
    page,
    pageSize: PAGE_SIZE,
    orderBy,
    keyword: searchKeyword,
  });

  // ====================================================
  // 7. 전체 페이지 개수 계산
  //    전체 페이지 수 = 전체 상품 개수 ÷ 한 페이지에 보여줄 개수
  // ====================================================
  // 전체상품개수 totalCount = 23개, 한 페이지에 PAGE_SIZE = 10개씩
  // → 1페이지 10개 → 2페이지 10개 → 3페이지3개; 결론: 총 3페이지 필요.
  // Math.ceil(2.3) = 3 (소수점 있으면 올림해야댐)
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // ====================================================
  // 9. 검색 버튼 눌렀을 때 실행 함수
  // ====================================================
  // 예: searchText = "  아이폰  " 검색창에 입력
  // => 검색 버튼 클릭
  // => searchText.trim() = "아이폰"  앞뒤 공백 없앰
  // => setSearchKeyword("아이폰")
  //    실제 서버에 보낼 검색어를 "아이폰"으로 바꿈
  // => setPage(1)
  //    "아이폰" 검색 결과를 1페이지부터 보여줌

  const handleSearch = (event) => {
    // form 제출하면 새로고침되는 기본 동작 막기
    event.preventDefault();

    // 검색창에 입력한 값을 실제 API 검색어 searchKeyword에 저장
    // searchKeyword가 바뀌면 그 검색어로 다시 API 요청
    setSearchKeyword(searchText.trim());

    // 새로운 검색이므로 1페이지부터 보여줌
    setPage(1);
  };

  // ====================================================
  // 10. 정렬 방식 바뀌었을 때 실행
  // ====================================================
  const handleOrderChange = (event) => {
    // 값은 State가 가지고 있고, setOrderBy는 orderBy State 값을 바꾸는 함수
    //
    // 사용자가 선택한 정렬값을 가져와서
    // orderBy State에 새 값으로 저장함
    // 예: "좋아요 순" 선택
    // event.target.value = "favorite"
    // → setOrderBy("favorite")
    // → orderBy가 "recent"에서 "favorite"로 바뀜
    setOrderBy(event.target.value);

    // 정렬이 바뀌면 1페이지부터 다시 보여줌
    setPage(1);
  };
  //
  // ====================================================
  // 11. 화면 만들기
  // ====================================================
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h2 className={styles.title}>판매 중인 상품</h2>

        <div className={styles.controls}>
          {/* =============================================
              12. 검색 폼
// value={searchText} → input에 보여줄 값을 React State가 관리
// 사용자가 글자 입력 → onChange 실행
// event.target.value → 사용자가 현재 입력한 글자
// setSearchText(...) → searchText 스테이트값을 변경
// 예: 사용자가 "맥북" 입력 → searchText = "맥북"
             ============================================= */}
          {/* form이 제출되면 handleSearch 함수를 실행해라 */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              className={styles.searchInput}
              // 검색창이라는 뜻
              type="search"
              // input 검색창에 보여지는 값을 searchText State가 가지고 있음
              value={searchText}
              // 사용자가 글자를 입력하면 onChange 실행
              // setSearchText() => 사용자가 입력한 값을 가져와서 searchText State 값으로 바꾸는 것
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="상품을 검색해 보세요"
              aria-label="상품 검색어"
            />

            <button className={styles.searchButton} type="submit">
              검색
            </button>
          </form>
          {/* =============================================
              13. 정렬 선택
// value={orderBy}
// → select에서 어떤 option을 선택된 상태로 보여줄지 orderBy 값으로 결정
// 예: orderBy = "recent"면 "최신 순"이 선택되어 보임
// 예: orderBy = "favorite"면 "좋아요 순"이 선택되어 보임

// 사용자가 "좋아요 순" 선택
// → select의 값이 바뀌어서 onChange 실행
// → handleOrderChange 함수 실행
// → event.target.value = "favorite"
//    (사용자가 선택한 option의 실제 value 값)
// → setOrderBy("favorite")
//    (orderBy State 값을 "favorite"로 변경)
// → orderBy = "favorite"
// → value={orderBy}도 "favorite"가 됨
// → 화면에서 "좋아요 순"이 선택된 상태로 보임
             ============================================= */}
          <select
            className={styles.select}
            value={orderBy}
            onChange={handleOrderChange}
            aria-label="상품 정렬 방식"
          >
            <option value="recent">최신 순</option>
            <option value="favorite">좋아요 순</option>
          </select>
        </div>
      </div>
      {/* =================================================
          14. 로딩 중 &  에러 발생
          // a && b는 a가 true면 → b를 보여줌/실행함
         ================================================= */}
      {isLoading && <p className={styles.message}>상품을 불러오는 중입니다.</p>}
      {error && <p className={styles.error}>{error}</p>}
      {/* =================================================
          로딩 중이 아니고 에러도 없고 상품도 0개면 */}
      {!isLoading && !error && products.length === 0 && (
        <p className={styles.message}>검색된 상품이 없습니다.</p>
      )}
      {/* =================================================
          15. 로딩 끝남 + 에러 없음 + 상품도 0보다 많으면
          → 상품 카드들 보여줌 + 페이지네이션 보여줌.
         ================================================= */}
      {!isLoading && !error && products.length > 0 && (
        <>
          {/* 상품목록 
products에 상품이 여러 개 있음 (useProducts 훅에서 받아옴)
→ map()으로 상품을 하나씩 꺼냄 (product에 담김)
→ 꺼낸 상품마다 ProductCard 하나씩 만듦
          */}
          {/* 
product={product}: → 지금 꺼낸 상품 1개를 자식인 ProductCard한테 프롭스로 보내는 것.
왼쪽 product → ProductCard한테 보내는 props 이름 / 오른쪽 product → map()에서 지금 꺼낸 상품 1개 */}
          {/*  */}
          {/* key={product.id}: → React가 각 상품 카드를 구분하려고 붙이는 고유 번호표*/}
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* 페이지네이션
          - 부모 SellingProducts가 자식 Pagination한테 필요한 값 3개를 보내는 것 */}
          {/* SellingProducts 부모 화면 안에 Pagination 자식이 뜨고, 
              부모가 자식한테 props를 보내는 것 */}
          <Pagination
            // 왼쪽은 Pagination한테 보내는 props 이름이고,
            // 오른쪽은 SellingProducts가 실제로 가지고 있는 값/함수.
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            // 페이지 바꾸는 함수 setPage를 onPageChange라는 이름으로 Pagination에게 보냄
          />
        </>
      )}
    </section>
  );
}

export default SellingProducts;
