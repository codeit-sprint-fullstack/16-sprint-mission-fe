import styles from './Footer.module.scss';
import facebook from '../assets/facebook.png';
import twitter from '../assets/x.png'
import youtube from '../assets/youtu.png'
import instagram from '../assets/insta.png'

// 정책 링크와 SNS 링크를 보여 주는 공통 푸터
function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerCopyright}>
          {/* 특정 스타일이 없다면 className을 지워도 무방합니다 */}
          <a href="#">
            @codeit-2024
          </a>
        </div>

        <div className={styles.footerLinks}>
          <a href="/Privacy">
            Privacy Policy
          </a>
          <a href="/faq">
            FAQ
          </a>
        </div>

        <div className={styles.footerSns}>
          <a
            href="https://www.facebook.com/?locale=ko_KR"
            className={styles.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="페이스북" />
          </a>

          <a
            href="https://x.com/?lang=ko"
            className={styles.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="트위터" />
          </a>

          <a
            href="https://www.youtube.com/?app=desktop&hl=ko&gl=KR"
            className={styles.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="유튜브" />
          </a>

          <a
            href="https://www.instagram.com/"
            className={styles.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
