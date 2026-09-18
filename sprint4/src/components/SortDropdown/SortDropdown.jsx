import { useState } from "react";
import styles from "./SortDropdown.module.scss";
import arrowDownIcon from "../../assets/icons/ic_arrow_down.png";
import sortIcon from "../../assets/icons/ic_sort.png";

const SortDropdown = ({
  orderBy,
}) => {

  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortLabel = orderBy === "favorite" ? "좋아요순" : "최신순";

  return (
    <div className={styles.sortBox}>
      <button
        type="button"
        className={styles.sortTrigger}
        onClick={() => setIsSortOpen((prev) => !prev)}
      >
        <span className={styles.sortText}>
          {sortLabel}
        </span>

        <img
          src={arrowDownIcon}
          alt=""
          className={styles.arrowIcon}
        />

        <img
          src={sortIcon}
          alt="정렬"
          className={styles.mobileSortIcon}
        />
      </button>

      {isSortOpen && (
        <div className={styles.sortMenu}>
          <button
            type="button"
            onClick={() => {
              setOrderBy("recent");
              setPageNumber(1);
              setIsSortOpen(false);
            }}
          >
            최신순
          </button>

          <button
            type="button"
            onClick={() => {
              setOrderBy("favorite");
              setPageNumber(1);
              setIsSortOpen(false);
            }}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;