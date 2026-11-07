'use client';

import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <a className="codeit" href="">ⓒcodeit-2024</a>
        <div className="footer-center">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className="footer-icons">
          <a href="https://www.facebook.com/?locale=ko_KR" target="_blank" rel="noreferrer">
            <div className="footer-icon-link">
              <img src="/asset/facebook.png" alt="페이스북" />
            </div>
          </a>
          <a href="https://www.youtube.com/?app=desktop&hl=ko&gl=KR" target="_blank" rel="noreferrer">
            <div className="footer-icon-link">
              <img src="/asset/youtube.png" alt="유튜브" />
            </div>
          </a>
          <a href="https://x.com/?lang=ko" target="_blank" rel="noreferrer">
            <div className="footer-icon-link">
              <img src="/asset/twitter.png" alt="트위터" />
            </div>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <div className="footer-icon-link">
              <img src="/asset/instagram.png" alt="인스타" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
