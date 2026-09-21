// src/components/SearchBar.jsx

function SearchBar({
  searchInput,
  setSearchInput,
  onSearch,
}) {
  return (
    <form
      className="search-bar"
      onSubmit={onSearch}
    >
      <input
        type="text"
        value={searchInput}
        onChange={(e) =>
          setSearchInput(e.target.value)
        }
        placeholder="검색할 상품을 입력해주세요"
      />

      <button type="submit">
        검색
      </button>
    </form>
  );
}

export default SearchBar;