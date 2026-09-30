// ======================================================
// Footer.jsx
// ======================================================

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* 왼쪽 */}
        <p className={styles.copyright}>©codeit - 2024</p>

        {/* 가운데 */}
        <ul className={styles.footerMenu}>
          <li>
            <a href="/privacy/privacy.html">Privacy Policy</a>
          </li>

          <li>
            <a href="/faq/faq.html">FAQ</a>
          </li>
        </ul>

        {/* 오른쪽 SNS */}
        <ul className={styles.social}>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="페이스북"
            >
              f
            </a>
          </li>

          <li>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              𝕏
            </a>
          </li>

          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="유튜브"
            >
              ▶
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="인스타그램"
            >
              ◎
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
