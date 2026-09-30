import { useNavigate } from "react-router-dom";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import styles from "./LandingPage.module.scss";

function LandingPage() {
  const navigate = useNavigate();

  // "구경하러 가기" 버튼을 누르면
  // 중고마켓 /items 로 이동
  const handleGoItems = () => {
    navigate("/items");
  };

  return (
    <>
      <Header />

      <main>
        {/* ==============================================================
            1. 맨 위 Hero 영역
        =============================================================== */}

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <h1>
                일상의 모든 물건을
                <br />
                거래해 보세요
              </h1>

              <button
                type="button"
                className={styles.heroButton}
                onClick={handleGoItems}
              >
                구경하러 가기
              </button>
            </div>

            <img
              className={styles.heroImage}
              src="/images/landing-hero.png"
              alt="판다마켓"
            />
          </div>
        </section>

        {/* ==============================================================
            2. 인기 상품
        =============================================================== */}

        <section className={styles.featureSection}>
          <div className={styles.featureInner}>
            <img
              className={styles.featureImage}
              src="/images/landing-hot-item.png"
              alt="인기 상품"
            />

            <div className={styles.featureText}>
              <span className={styles.keyword}>Hot item</span>

              <h2>
                인기 상품을
                <br />
                확인해 보세요
              </h2>

              <p>
                가장 HOT한 중고거래 물품을
                <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </section>

        {/* ==============================================================
            3. 상품 검색
        =============================================================== */}

        <section className={styles.featureSection}>
          <div className={`${styles.featureInner} ${styles.reverse}`}>
            <div className={styles.featureText}>
              <span className={styles.keyword}>Search</span>

              <h2>
                구매를 원하는
                <br />
                상품을 검색하세요
              </h2>

              <p>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>

            <img
              className={styles.featureImage}
              src="/images/landing-search.png"
              alt="상품 검색"
            />
          </div>
        </section>

        {/* ==============================================================
            4. 상품 등록
        =============================================================== */}

        <section className={styles.featureSection}>
          <div className={styles.featureInner}>
            <img
              className={styles.featureImage}
              src="/images/landing-register.png"
              alt="상품 등록"
            />

            <div className={styles.featureText}>
              <span className={styles.keyword}>Register</span>

              <h2>
                판매를 원하는
                <br />
                상품을 등록하세요
              </h2>

              <p>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록해 보세요
              </p>
            </div>
          </div>
        </section>

        {/* ==============================================================
            5. 아래쪽 배너
        =============================================================== */}

        <section className={styles.bottomBanner}>
          <div className={styles.bottomInner}>
            <h2>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h2>

            <img
              className={styles.bottomImage}
              src="/images/landing-bottom.png"
              alt="판다마켓 중고거래"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
