function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <span className="footer-copyright">
          ©codeit - 2024
        </span>

        <nav className="footer-menu">
          <a href="/privacy/">Privacy Policy</a>
          <a href="/faq/">FAQ</a>
        </nav>

        <div className="footer-sns">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_facebook.svg" alt="페이스북" />
          </a>

          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_twitter.svg" alt="트위터" />
          </a>

          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_youtube.svg" alt="유튜브" />
          </a>

          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/ic_instagram.svg" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;