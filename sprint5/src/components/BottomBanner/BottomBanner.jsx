import bannerStyles from "../MainBanner/MainBanner.module.scss";
import bottomBannerImage from "../../assets/images/img-bottom-banner.png";
import { Link } from "react-router-dom";


const BottomBanner = () => {
  return (
    <section className={`${bannerStyles.bottomBanner} ${bannerStyles.mainBanner}`} >
      <div className={bannerStyles.bannerWrap}>
        <div className={bannerStyles.bannerText}>
          <h2>
            믿을 수 있는<br />
            판다마켓 중고 거래
          </h2>
        </div>
        <div className={bannerStyles.bannerImg}>
          <img src={bottomBannerImage} alt="하단배너 이미지" />
        </div>
      </div>
    </section>
  );
}

export default BottomBanner