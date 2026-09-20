import styles from './SortDropdown.module.scss';

// 최신순 또는 좋아요순 정렬 기준을 선택하는 드롭다운
function SortDropdown({ orderBy, onOrderByChange }) {
  return (
    <select
      className={styles.sort}
      value={orderBy}
      onChange={(e) => onOrderByChange(e.target.value)}
    >
      <option value="recent">최신순</option>
      <option value="favorite">좋아요순</option>
    </select>
  );
}

export default SortDropdown;
