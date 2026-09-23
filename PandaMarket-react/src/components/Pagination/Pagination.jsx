// ======================================================
// src/components/Pagination/Pagination.jsx
// 페이지 번호만 담당하는 컴포넌트
// ======================================================
import styles from "./Pagination.module.scss";

// ======================================================
// 1. Pagination 컴포넌트
// - SellingProducts 부모가 보내준 props를 구조분해할당으로 바로 꺼내서 받는 것
// ======================================================
// 부모가 3가지 값을 보내줌
// currentPage → 지금 몇 페이지인지
// totalPages → 전체 페이지가 몇 개인지
// onPageChange → 페이지를 바꾸는 함수 (setpage)
//<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
function Pagination({ currentPage, totalPages, onPageChange }) {
  //
  // ======================================================
  // 2. 페이지가 1개 이하라면 페이지네이션 안 보여주기
  // 페이지가 1개뿐이면 굳이 페이지 번호를 누를 필요가 없음  ‹ 1 ›
  // ======================================================
  if (totalPages <= 1) {
    return null;
  }

  //
  // ======================================================
  // 3. 한 번에 보여줄 페이지 번호 개수
  // ======================================================
  // 한 번에 페이지 번호를 5개씩 보여준다는 뜻: 1 2 3 4 5
  const pageGroupSize = 5;

  // ======================================================
  // 4. 현재 페이지가 속한 페이지 묶음의 시작 번호를 구하는 코드
  // currentPage → 지금 몇 페이지인지, 부모 프롭스:currentPage ={page}
  // totalPages → 전체 페이지가 몇 개인지
  // ======================================================
  // 예를 들어서 지금 페이지가 8이면 8은 6~10 묶음에 들어가니까
  // 6 7 8 9 10
  // ↑ startPage = 6이다. 이걸 계산식으로 풀어냄
  //
  // Math.floor((8 - 1) / 5) * 5 + 1
  // 8 - 1 = 7
  // 7 / 5 = 1.4
  // Math.floor(1.4) = 1
  // 1 * 5 = 5
  // 5 + 1 = 6
  const startPage =
    Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
  // ======================================================
  // 묶음의 끝 페이지를 구하되, 실제 마지막 페이지를 넘지 않게 하는 코드
  // 예를 들어서
  // startPage = 6    pageGroupSize = 5   totalPages = 8 이라고 하면
  // 원래라면 6 7 8 9 10 이렇게 5개를 보여주고 싶음
  //
  // 그래서 먼저 끝 페이지를 계산하면 startPage + pageGroupSize - 1
  // 6 + 5 - 1 = 10  원래 endPage는 10이 됨
  //
  // 그런데 실제 전체 페이지는 totalPages = 8까지밖에 없음
  // 즉 9, 10페이지는 존재하지 않음
  //
  // 그래서 Math.min()을 사용함  Math.min(10, 8) = 8
  //
  // 둘 중 더 작은 숫자를 선택함 그래서 최종적으로 6 7 8 endPage = 8이 됨

  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  // ====================================================
  // 5. 화면에 보여줄 페이지 번호 배열 만들기
  // ====================================================
  // startPage부터 endPage까지 숫자를 하나씩 배열에 넣음
  // 예: startPage = 6, endPage = 10
  // 결과: pageNumbers = [6, 7, 8, 9, 10]

  const pageNumbers = [];
  for (let page = startPage; page <= endPage; page += 1) {
    pageNumbers.push(page);
  }

  // ====================================================
  // 6. 화면
  // ====================================================
  return (
    <nav className={styles.pagination} aria-label="상품 목록 페이지">
      {/* ==============================================
          이전 페이지
// 이전 페이지로 가는 버튼
// 현재 페이지가 1이면 더 뒤로 갈 수 없으니까 버튼을 비활성화함
// 그 외에는 클릭하면 현재 페이지에서 1을 뺀 페이지로 이동함
//
// 예: currentPage = 8; 현재페이지
// 8 - 1 = 7
// → onPageChange(7)
// → 7페이지로 이동          
//
// onPageChange는 부모인 SellingProducts.jsx에서: props로 받은 함수
// 부모에서: onPageChange={setPage}
// onPageChange = 페이지 변경 함수
         ============================================== */}
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {/* ==============================================
          페이지 번호 버튼들을 반복해서 만들고, 
          현재 페이지에는 active 스타일을 주는 코드
// pageNumbers에 들어있는 페이지 번호만큼 버튼을 반복해서 만듦
// 예: pageNumbers = [6, 7, 8, 9, 10]

// 현재 페이지와 같은 번호면 active 스타일을 추가함
// 예: currentPage = 8이면 8번 버튼만 active

// 버튼을 누르면 그 번호를 onPageChange에 전달해서 페이지를 바꿈
// 예: 9 클릭 → onPageChange(9) → 9페이지로 변경          
         ============================================== */}
      {/* 
// pageNumbers = [6, 7, 8, 9, 10] 이라고 생각하자
// 배열에 있는 숫자만큼 버튼을 하나씩 만듦
// 6 버튼, 7 버튼, 8 버튼, 9 버튼, 10 버튼         
         */}
      {pageNumbers.map((page) => (
        <button
          type="button"
          key={page}
          // 지금 보고 있는 페이지와 같으면 active 스타일 적용
          // 예: currentPage = 8 → 8번 버튼만 active
          className={`${styles.button} ${
            currentPage === page ? styles.active : ""
          }`}
          // 버튼을 누르면 그 페이지 번호로 변경
          // 예: 9 클릭
          // → onPageChange(9)
          // → 9페이지로 변경
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      {/* ==============================================
          다음 페이지
// 다음 페이지로 가는 버튼
// 현재 페이지가 마지막 페이지면 더 갈 수 없으니까 버튼을 비활성화함
// 클릭하면 현재 페이지에 1을 더한 페이지로 이동함
//
// 예: currentPage = 7
// 7 + 1 = 8
// onPageChange(8)
// → 8페이지로 이동          
         ============================================== */}
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;
