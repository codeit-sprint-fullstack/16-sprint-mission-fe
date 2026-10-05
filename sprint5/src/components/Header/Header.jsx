import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss"
import pcLogo from "../../assets/images/logo.png";
import mobileLogo from "../../assets/images/ic_mobileLogo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <a href="/" className={styles.logo}>
            <img className={styles.pcLogo} src={pcLogo} alt="판다마켓로고" />
            <img className={styles.mobileLogo} src={mobileLogo} alt="판다마켓모바일로고" />
          </a>

          <nav className={styles.nav}>
            <a href="#">자유게시판</a>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive ? styles.active : ""
              }
            >
              중고마켓
            </NavLink>
          </nav>
        </div>

        <button className={styles.loginButton}>
          로그인
        </button>
      </div>
    </header>
  );
}

export default Header;