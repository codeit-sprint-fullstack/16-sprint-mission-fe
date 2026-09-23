import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* 왼쪽 영역 */}
        <div className={styles.leftMenu}>
          <Link to="/" className={styles.logoname}>
            <img src={logo} alt="판다마켓 로고" />
          </Link>

          <Link to="/free">자유게시판</Link>
          <Link to="/market">중고마켓</Link>
        </div>

        {/* 오른쪽 로그인 */}
        <Link to="/login" className={styles.loginButton}>
          로그인
        </Link>
      </div>
    </header>
  );
};

export default Header;
