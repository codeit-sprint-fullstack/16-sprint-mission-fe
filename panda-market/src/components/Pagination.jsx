import styles from './Pagination.module.scss';

// 한 번에 화면에 보여 줄 페이지 번호 개수
const PAGE_GROUP_SIZE = 5;

// 전체 상품 수를 기준으로 페이지 번호와 이전/다음 버튼을 표시
function Pagination({ page, totalCount, pageSize, onPageChange }) {
  // 상품 수와 한 페이지 상품 수로 전체 페이지 수 계산
  const totalPages = Math.ceil(totalCount / pageSize);

  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePrev = () => {
    // 첫 페이지보다 클 때만 이전 페이지로 이동
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    // 마지막 페이지보다 작을 때만 다음 페이지로 이동
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.arrow} onClick={handlePrev} disabled={page === 1}>
        {'<'}
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`${styles.page} ${num === page ? styles.active : ''}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button className={styles.arrow} onClick={handleNext} disabled={page === totalPages}>
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
