'use client';

import { useState } from 'react';
import Link from 'next/link';
import './login.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API || 'https://one6-sprint-mission-be.onrender.com';
      const res = await axios.post(
        `${apiUrl}/auth/signIn`,
        {
          email: email,
          password: password
        }
      );

      const accessToken = res.data.accessToken;
      //console.log("토큰",accessToken);
      localStorage.setItem("accessToken", accessToken);

      alert("로그인 성공");
      router.push('/items');

    } catch (error) {

    }
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
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src="/asset/btn_eye.png"
                alt="비밀번호 보기 토글"
                className="eye-icon"
              />
            </button>
          </div>

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
