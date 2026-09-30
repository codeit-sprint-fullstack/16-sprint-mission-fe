import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import folderImage from "../assets/images/folder.png";
import landImage from "../assets/images/land.png";
import searchImage from "../assets/images/search.png";
import shoppingImage from "../assets/images/shopping.png";
import tradeImage from "../assets/images/trade.png";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <Header />

      <main className="landing-page">
        <section className="main-banner">
          <div className="banner-container">
            <div className="main-left">
              <h1>
                일상의 모든 물건을
                <br />
                거래해 보세요
              </h1>

              <Link to="/items" className="items">
                구경하러 가기
              </Link>
            </div>

            <img
              src={landImage}
              className="land"
              alt="판다가 서 있는 모습"
            />
          </div>
        </section>

        <div className="function-container">
          <section className="hot-item">
            <div className="grey-box">
              <img
                src={shoppingImage}
                className="shopping"
                alt="판다가 물건을 고르는 모습"
              />

              <div className="text">
                <p className="label">Hot item</p>
                <h2>
                  인기 상품을
                  <br />
                  확인해 보세요
                </h2>
                <p className="detail">
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </section>

          <section className="search">
            <div className="grey-box">
              <div className="text">
                <p className="label">Search</p>
                <h2>
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </h2>
                <p className="detail">
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </p>
              </div>

              <img
                src={searchImage}
                className="search-img"
                alt="돋보기로 탐색하는 모습"
              />
            </div>
          </section>

          <section className="register">
            <div className="grey-box">
              <img
                src={folderImage}
                className="folder"
                alt="여러 물건을 폴더별로 분류하는 모습"
              />

              <div className="text">
                <p className="label">Register</p>
                <h2>
                  판매를 원하는
                  <br />
                  상품을 등록하세요
                </h2>
                <p className="detail">
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="bottom-banner">
          <div className="bottom-group">
            <p>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </p>

            <img
              src={tradeImage}
              className="trade"
              alt="판다 두 마리가 중고 거래하는 모습"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;