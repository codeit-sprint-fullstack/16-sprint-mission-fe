import './Header.scss';

const Header = () => {
  return (
    <header>
      <nav className='gnb'>
        <h1 className='logo'><a href='/'>판다마켓</a></h1>
        <ul>
          <li><a href='#'>자유게시판</a></li>
          <li><a href='#'>중고마켓</a></li>
        </ul>
        <a href='#' className='login-btn'>로그인</a>
      </nav>
    </header>
  );
};

export default Header;