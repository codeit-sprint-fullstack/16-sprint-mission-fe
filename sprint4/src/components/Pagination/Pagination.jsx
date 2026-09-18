import styles from "./Pagination.module.scss";

const PAGE_COUNT = 5;

const Pagination = ({
  pageNumber,
  totalCount,
  onPageChange,
  productPageSize
}) => {

  //현재 페이지가 가운데오게 하고싶어서 일단 검색해서 구현...
  const totalPages = Math.ceil(totalCount / productPageSize);

  const PAGE_COUNT = 5;

  let startPage = Math.max(
    pageNumber - Math.floor(PAGE_COUNT / 2),
    1,
  );

  const endPage = Math.min(
    startPage + PAGE_COUNT - 1,
    totalPages,
  );

  startPage = Math.max(
    endPage - PAGE_COUNT + 1,
    1,
  );

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrowButton}
        onClick={() => onPageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        ‹
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          type="button"
          className={
            pageNumber === number
              ? styles.active
              : styles.pageButton
          }
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        className={styles.arrowButton}
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        ›
      </button>
    </div>
  );
}

export default Pagination