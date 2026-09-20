import logoImage from '../assets/logo/panda-market-logo.png'

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="판다마켓 홈">
        <img src={logoImage} alt="판다마켓" />
      </a>
      <nav className="site-nav" aria-label="주요 메뉴">
        <a href="/boards">자유게시판</a>
        <a href="/item">중고마켓</a>
      </nav>
      <a className="login-button" href="/login">
        로그인
      </a>
    </header>
  )
}

export default Header
