'use client';

import { useState } from 'react';
import Link from 'next/link';
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
    // TODO: 로그인 API 연동
  };

  return (
    <div className="login-wrapper">
      <div className="login-banner">
        <Link href="/">
          <div className="panda-logo">
            <img className="panda-img" src="/asset/logo.png" alt="판다마켓" />
          </div>
        </Link>

        <form className="login-banner-bottom-container" onSubmit={handleSubmit}>
          <p>이메일</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
          />

          <p>비밀번호</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />

          <button className="login-confirm" type="submit">
            로그인
          </button>

          <div className="login-banner-social-login">
            <p className="social-login-text">간편 로그인하기</p>
            <div className="social-login-button-container">
              <a href="https://www.google.com/" className="social-button" target="_blank" rel="noreferrer">
                <div>
                  <img className="login-icon" src="/asset/Google.png" alt="구글" />
                </div>
              </a>
              <a href="https://www.kakaocorp.com/page/" className="social-button" target="_blank" rel="noreferrer">
                <div>
                  <img className="login-icon" src="/asset/Kakao.png" alt="카카오" />
                </div>
              </a>
            </div>
          </div>

          <div className="new-user-info">
            <p>판다마켓이 처음이신가요?</p>
            <Link href="/signup">
              <p className="signup">회원가입</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
