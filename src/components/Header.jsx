import { Link, NavLink, useLocation } from 'react-router';
import './Header.scss';

const Header = () => {
  const url = useLocation();
  const isIndex = url.pathname === '/';

  return (
    <header className={isIndex ? 'landing' : undefined}>
      <nav className='gnb'>
        <h1 className='logo'><Link to='/'>판다마켓</Link></h1>
        <ul>
          <li><NavLink to='/board'>자유게시판</NavLink></li>
          <li><NavLink to='/items'>중고마켓</NavLink></li>
        </ul>
        <Link to='/login' className='login-btn'>로그인</Link>
      </nav>
    </header>
  );
};

export default Header;