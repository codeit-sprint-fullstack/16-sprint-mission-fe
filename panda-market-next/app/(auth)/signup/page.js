'use client';

import { useState } from 'react';
import Link from 'next/link';
import './signup.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('회원가입 시도:', { email, nickname, password });
    // TODO: 회원가입 API 연동
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-banner">
        <Link href="/">
          <div className="panda-logo">
            <img className="panda-img" src="/asset/logo.png" alt="판다마켓" />
          </div>
        </Link>

        <form className="signup-banner-bottom-container" onSubmit={handleSubmit}>
          <p>이메일</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
          />

          <p>닉네임</p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />

          <p>비밀번호</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />

          <p>비밀번호 확인</p>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />

          <button className="signup-confirm" type="submit">
            회원가입
          </button>

          <div className="signup-banner-social-login">
            <p className="social-signup-text">간편 회원가입</p>
            <div className="social-signup-button-container">
              <a href="https://www.google.com/" className="social-button" target="_blank" rel="noreferrer">
                <div>
                  <img className="signup-icon" src="/asset/Google.png" alt="구글" />
                </div>
              </a>
              <a href="https://www.kakaocorp.com/page/" className="social-button" target="_blank" rel="noreferrer">
                <div>
                  <img className="signup-icon" src="/asset/Kakao.png" alt="카카오" />
                </div>
              </a>
            </div>
          </div>

          <div className="old-user-info">
            <p>이미 회원이신가요?</p>
            <Link href="/login">
              <p className="login-navigate">로그인</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
