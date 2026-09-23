function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="header-left">
          <a href="/landing.html" className="logo">
            <img
              className="logo-desktop"
              src="/images/logo.png"
              alt="판다마켓"
            />

            <img
              className="logo-mobile"
              src="/images/logo-mobile@2x.png"
              alt="판다마켓"
            />
          </a>

          <nav className="header-nav">
            <a href="/free">자유게시판</a>
            <a href="/">중고마켓</a>
          </nav>
        </div>

        <a href="/login/" className="login">
          로그인
        </a>
      </div>
    </header>
  );
}

export default Header;