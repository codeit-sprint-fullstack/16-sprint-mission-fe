import { Link } from 'react-router';
import bannerTop from '../assets/banner_top.png';
import banner1 from '../assets/banner_01.png';
import banner2 from '../assets/banner_02.png';
import banner3 from '../assets/banner_03.png';
import bannerBottom from '../assets/banner_bottom.png';
import styles from './LandingPage.module.scss';

const IndexPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.bannerTop}>
        <div className={styles.inner}>
          <div className={styles.textBox}>
            <p>일상의 모든 물건을 거래해 보세요</p>
            <Link to='/items' className={styles.itemBtn}>구경하러 가기</Link>
          </div>
          <div className={styles.imgBox}>
            <img src={bannerTop} alt='귀여운 판다 캐릭터가 인사를 하고 있는 일러스트' />
          </div>
        </div>
      </section>
      <section className={styles.banner}>
        <div className={styles.inner}>
          <div className={styles.imgBox}>
            <img src={banner1} alt='판다 캐릭터들이 인기가 많은 상품을 구경하는 일러스트' />
          </div>
          <div className={styles.textBox}>
            <p className={styles.subTitle}>Hot item</p>
            <p className={styles.title}>인기 상품을 확인해 보세요</p>
            <p className={styles.text}>가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</p>
          </div>
        </div>
      </section>
      <section className={styles.banner}>
        <div className={styles.inner}>
          <div className={styles.imgBox}>
            <img src={banner2} alt='어떤 상품인지 돋보기를 들고 탐색하는 일러스트' />
          </div>
          <div className={styles.textBox}>
            <p className={styles.subTitle}>Search</p>
            <p className={styles.title}>구매를 원하는 상품을 검색하세요</p>
            <p className={styles.text}>구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</p>
          </div>
        </div>
      </section>
      <section className={styles.banner}>
        <div className={styles.inner}>
          <div className={styles.imgBox}>
            <img src={banner3} alt='다양한 여러 상품들이 폴더와 함께 나열된 일러스트' />
          </div>
          <div className={styles.textBox}>
            <p className={styles.subTitle}>Register</p>
            <p className={styles.title}>판매를 원하는 상품을 등록하세요</p>
            <p className={styles.text}>어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
          </div>
        </div>
      </section>
      <section className={styles.bannerBottom}>
        <div className={styles.inner}>
          <div className={styles.textBox}>
            <p>믿을 수 있는<br />판다마켓 중고 거래</p>
          </div>
          <div className={styles.imgBox}>
            <img src={bannerBottom} alt='귀여운 판다끼리 대화를 나누며 거래를 하는 모습의 일러스트' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default IndexPage;