import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function LandingPage() {
  return (
    <>
      <Header landing />
      <main>

        <section className="home-top">

            <div className="home-top-inner">

                <div className="home-top-content">

                    <h1>
                        일상의 모든 물건을<br />
                        거래해 보세요
                    </h1>

                    <Link to="/items" className="home-top-button">
                        구경하러 가기
                    </Link>

                </div>

                <img src="/images/Img_home_top.png" alt="판다마켓" className="home-top-image" />

            </div>

        </section>

        <section className="item">

            <div className="item-inner">

                <div className="layer">

                    <img src="/images/Img_home_01.png" alt="인기 상품" />

                </div>

                <div className="item-content">

                    <span>Hot item</span>

                    <div className="item-title">

                        <h2>
                            인기 상품을<br />
                            확인해 보세요
                        </h2>

                        <p>
                            가장 HOT한 중고거래 물품을<br />
                            판다마켓에서 확인해 보세요
                        </p>

                    </div>

                </div>

            </div>

        </section>

        <section className="search">

            <div className="search-inner">

                <div className="search-content">

                    <div className="search-title">

                        <span>Search</span>

                        <h2>
                            구매를 원하는<br />
                            상품을 검색하세요
                        </h2>

                        <p>
                            구매하고 싶은 물품은 검색해서<br />
                            쉽게 찾아보세요
                        </p>

                    </div>

                </div>

                <div className="layer">

                    <img src="/images/Img_home_02.png" alt="상품 검색" />

                </div>

            </div>

        </section>

        <section className="register">

            <div className="register-inner">

                <div className="layer">

                    <img src="/images/Img_home_03.png" alt="상품 등록" />

                </div>

                <div className="register-content">

                    <span>Register</span>

                    <div className="register-title">

                        <h2>
                            판매를 원하는<br />
                            상품을 등록하세요
                        </h2>

                        <p>
                            어떤 물건이든 판매하고 싶은 상품을<br />
                            쉽게 등록하세요
                        </p>

                    </div>

                </div>

            </div>

        </section>

        <section className="home-bottom">

            <div className="home-bottom-inner">

                <div className="home-bottom-content">

                    <h2>
                        믿을 수 있는<br />
                        판다마켓 중고 거래
                    </h2>

                </div>

                <img src="/images/Img_home_bottom.png" alt="판다마켓" className="home-bottom-image" />

            </div>

        </section>

    </main>
      <Footer />
    </>
  );
}

export default LandingPage;
