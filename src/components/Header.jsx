// src/components/Header.jsx

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">
          판다마켓
        </a>

        <button type="button">
          로그인
        </button>
      </div>
    </header>
  );
}

export default Header;