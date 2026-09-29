import styles from './Header.module.scss';
import pandaLogo from '../assets/panda-logo.png';

// 로고, 메뉴, 로그인 버튼을 보여 주는 상단 네비게이션
function Header() {
  return (
  <header className={styles.header}>
    <div className={styles.left}>
      <div className={styles.logo}>
        <img src={pandaLogo} alt="판다마켓 로고" />
        <span>판다마켓</span>
      </div>
      <nav className={styles.nav}>
        <a href="#">자유게시판</a>
        <a href="#">중고마켓</a>
      </nav>
    </div>
    <button className={styles.loginButton}>로그인</button>
</header>
  );
}

export default Header;
