import styles from './SearchBar.module.scss';

// 부모 컴포넌트의 검색어 상태를 수정하는 제어 컴포넌트
function SearchBar({ keyword, onKeywordChange }) {
  return (
    <input
      type="text"
      className={styles.search}
      placeholder="검색할 상품을 입력해주세요"
      value={keyword}
      onChange={(e) => onKeywordChange(e.target.value)}
    />
  );
}

export default SearchBar;
