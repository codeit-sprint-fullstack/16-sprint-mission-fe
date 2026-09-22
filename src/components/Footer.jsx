import "./Footer.css";
import facebook from "../assets/images/facebook.png";
import twitter from "../assets/images/twitter.png";
import youtube from "../assets/images/youtube.png";
import instagram from "../assets/images/insta.png";

function Footer() {
  return (
    <footer>
      <div className="footer-contents">
        <p className="copyright">©codeit-2024</p>

        <div className="privacy-faq">
          <a href="/privacy" className="privacy">
            Privacy Policy
          </a>
          <a href="/faq" className="faq">
            FAQ
          </a>
        </div>

        <ul className="social-list">
          <li className="facebook">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="페이스북" />
            </a>
          </li>

          <li className="twitter">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="트위터" />
            </a>
          </li>

          <li className="youtube">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtube} alt="유튜브" />
            </a>
          </li>

          <li className="insta">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="인스타그램" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

