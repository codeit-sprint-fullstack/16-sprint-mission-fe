import "./Pagination.css";

function Pagination({ page, totalCount, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav className="pagination" aria-label="상품 페이지 이동">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={pageNumber === page ? "is-active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </button>
    </nav>
  );
}

export default Pagination;