import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  return (
    <>
      <header>
        <section className="제목">
          <section className="제목-1">
            <Link to="/">
              <img
                src="/mission1-image/market_logo.png"
                alt="판다마켓"
              />
            </Link>

            <Link className="login-button" to="/login">
              로그인
            </Link>
          </section>
        </section>
      </header>

      <main>
        <section className="거래">
          <section className="거래-1">
            <div className="거래-text">
              <h2
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 500,
                }}
              >
                일상의 모든 물건을
                <br />
                거래해 보세요
              </h2>

              <Link className="look-button" to="/items">
                구경하러 가기
              </Link>
            </div>

            <img
              src="/mission1-image/Img_home_top.png"
              alt="판다 집"
            />
          </section>
        </section>

        <section className="hot">
          <section className="hot-1">
            <img
              src="/mission1-image/Img_home_01.png"
              alt="판다 옷"
            />

            <div className="hot-text">
              <h3
                style={{
                  fontSize: "0.8rem",
                  color: "dodgerblue",
                }}
              >
                Hot item
              </h3>

              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 500,
                }}
              >
                인기 상품을
                <br />
                확인해 보세요
              </p>

              <p>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </section>
        </section>

        <section className="search">
          <section className="search-1">
            <div className="search-text">
              <h4
                style={{
                  fontSize: "0.8rem",
                  color: "dodgerblue",
                }}
              >
                search
              </h4>

              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 500,
                }}
              >
                구매를 원하는
                <br />
                상품을 검색하세요
              </p>

              <p>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>

            <img
              src="/mission1-image/Img_home_02-1.png"
              alt="돋보기"
            />
          </section>
        </section>

        <section className="register">
          <section className="register-1">
            <img
              src="/mission1-image/Img_home_03.png"
              alt="상품 등록"
            />

            <div className="register-text">
              <h5
                style={{
                  fontSize: "0.8rem",
                  color: "dodgerblue",
                }}
              >
                Register
              </h5>

              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 500,
                }}
              >
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>

              <p>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </section>
        </section>

        <section className="c">
          <section className="c-1">
            <div className="c-text">
              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 500,
                }}
              >
                믿을 수 있는
                <br />
                판다마켓 중고거래
              </p>
            </div>

            <img
              src="/mission1-image/Img_home_bottom.png"
              alt="판다마켓 중고거래"
            />
          </section>
        </section>
      </main>

      <footer>
        <section className="d">
          <section className="d-text">
            <div className="d-1">
              <p>@codeit-2024</p>
            </div>

            <div className="d-2">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/faq">FAQ</Link>
            </div>

            <div className="d-3">
              <a
                href="https://www.facebook.com/?locale=ko_KR"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/mission1-image/ic_facebook.png"
                  alt="Facebook"
                />
              </a>

              <a
                href="https://x.com/?lang=ko"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/mission1-image/ic_twitter.png"
                  alt="X"
                />
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/mission1-image/ic_youtube.png"
                  alt="YouTube"
                />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/mission1-image/ic_instagram.png"
                  alt="Instagram"
                />
              </a>
            </div>
          </section>
        </section>
      </footer>
    </>
  );
}

export default LandingPage;