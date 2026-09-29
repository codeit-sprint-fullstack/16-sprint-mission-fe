import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className='inner'>
        <p className='copy'>©codeit - 2026</p>
        <ul className='fnb'>
          <li><a href='#'>Privacy Policy</a></li>
          <li><a href='#'>FAQ</a></li>
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