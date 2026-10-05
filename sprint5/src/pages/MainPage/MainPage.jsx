import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MainBanner from "../../components/MainBanner/MainBanner";
import hotItemImage from "../../assets/images/img-home-01.png"
import searchImage from "../../assets/images/img-home-02.png"
import registerImage from "../../assets/images/img-home-03.png"
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import BottomBanner from "../../components/BottomBanner/BottomBanner";

const MainPage = () => {

  return (
    <>
      <Header />

      <MainBanner />

      <FeatureSection
        label="Hot item"
        title={
          <>
            인기 상품을 <br />
            확인해 보세요
          </>
        }
        description={
          <>
            가장 HOT한 중고거래 물품을
            <br />
            판다 마켓에서 확인해 보세요
          </>
        }
        image={hotItemImage}
        imageAlt="인기 상품"
      />

      <FeatureSection
        label="Search"
        title={
          <>
            구매를 원하는 상품을 검색하세요
          </>
        }
        description={
          <>
            구매하고 싶은 물품은 검색해서
            <br />
            쉽게 찾아보세요
          </>
        }
        image={searchImage}
        imageAlt="상품 검색"
        reverse
      />

      <FeatureSection
        label="Register"
        title={
          <>
            판매를 원하는 상품을 등록하세요
          </>
        }
        description={
          <>
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </>
        }
        image={registerImage}
        imageAlt="상품 등록"
      />

      <BottomBanner />

      <Footer />
    </>

  );
}

export default MainPage