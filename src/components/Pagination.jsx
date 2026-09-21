// src/components/Pagination.jsx

function Pagination({
  page,
  totalPages,
  onChange,
}) {
  return (
    <div className="pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        이전
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        type="button"
        disabled={
          page === totalPages || totalPages === 0
        }
        onClick={() => onChange(page + 1)}
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;