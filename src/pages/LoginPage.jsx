import { useState } from "react";
import { Link } from "react-router-dom";
import googleLogo from "../assets/images/google.png";
import kakaoLogo from "../assets/images/kakao.png";
import loginLogo from "../assets/images/login-logo.png";
import "./LoginPage.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <Link to="/">
            <img src={loginLogo} alt="판다마켓 로고" />
          </Link>
        </header>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="auth-field">
            <label htmlFor="email">이메일</label>

            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">비밀번호</label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
              />

              <button
                type="button"
                className="password-toggle-button"
                onClick={() => {
                  setShowPassword((previous) => !previous);
                }}
                aria-label={
                  showPassword
                    ? "비밀번호 숨기기"
                    : "비밀번호 보기"
                }
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a16.2 16.2 0 0 1-2.1 3.2" />
                    <path d="M6.6 6.6C3.5 8.5 2 12 2 12s3.5 8 10 8a9.8 9.8 0 0 0 4.1-.9" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit-button"
          >
            로그인
          </button>
        </form>

        <div className="auth-footer">
          <div className="social-login">
            <p>간편 로그인하기</p>

            <div className="social-buttons">
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={googleLogo} alt="구글 로고" />
              </a>

              <a
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={kakaoLogo} alt="카카오톡 로고" />
              </a>
            </div>
          </div>

          <div className="auth-bottom-text">
            <p>판다마켓이 처음이신가요?</p>

            <Link className="auth-link" to="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;