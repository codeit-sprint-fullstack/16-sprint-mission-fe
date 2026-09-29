import { Link, NavLink } from "react-router-dom";

function Header({ landing = false }) {
  return (
    <header>
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="logo">
            <img
              className="logo-desktop"
              src="/images/logo.png"
              alt="판다마켓"
            />

            {!landing && <img
              className="logo-mobile"
              src="/images/logo-mobile@2x.png"
              alt="판다마켓"
            />}
          </Link>

          {!landing && <nav className="header-nav">
            <a href="/free.html">자유게시판</a>
            <NavLink to="/items" end>중고마켓</NavLink>
          </nav>}
        </div>

        <a href="/login/" className="login">
          로그인
        </a>
      </div>
    </header>
  );
}

export default Header;
