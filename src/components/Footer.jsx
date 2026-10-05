import { Link } from 'react-router';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className='inner'>
        <p className='copy'>©codeit - 2026</p>
        <ul className='fnb'>
          <li><Link to='/privacy'>Privacy Policy</Link></li>
          <li><Link to='/faq'>FAQ</Link></li>
        </ul>
        <div className='sns-box'>
          <a target='_blank' href='https://www.facebook.com/' className='ic-facebook'>페이스북</a>
          <a target='_blank' href='https://x.com/' className='ic-twitter'>트위터</a>
          <a target='_blank' href='https://www.youtube.com/' className='ic-youtube'>유튜브</a>
          <a target='_blank' href='https://www.instagram.com/' className='ic-instagram'>인스타그램</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;