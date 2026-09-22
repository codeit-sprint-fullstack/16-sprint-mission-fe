import "./Header.css";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="site-header">
      <nav>
        <div className="nav-container">
          <a href="/">
            <img src={logo} className="logo" alt="판다마켓 로고" />
          </a>

          <a href="/login" className="login-button">
            로그인
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;