import styles from "./SearchBar.module.scss";
import searchIcon from "../../assets/icons/ic_search.png";

const SearchBar = ({
  searchInput,
  setSearchInput,
  setKeyword,
  setPageNumber
}) => {

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      setKeyword(searchInput);
      setPageNumber(1);
    }
  };

  const handleSearch = () => {
    setKeyword(searchInput);
    setPageNumber(1);
  };

  return(
    <div className={styles.searchBox}>
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
      >
      <img src={searchIcon} alt="검색" />
      </button>
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value)}}
        onKeyDown={handleSearchKeyDown}
      />
    </div>
  );
};

export default SearchBar;