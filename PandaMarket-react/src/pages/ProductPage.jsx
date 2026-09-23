// ======================================================
// src/pages/ProductPage/ProductPage.jsx
// 각 컴포넌트를 조립하는 페이지
// ======================================================
import Header from "../components/header/header";
// import Footer from "../../components/footer/footer";
import BestProducts from "../components/BestProducts/BestProducts";
import SellingProducts from "../components/SellingProducts/SellingProducts";
// import styles from "../ProductPage.module.scss";
import styles from "../pages/ProductPage.module.scss";
import Footer from "../components/footer/footer";

function ProductPage() {
  return (
    <div className={styles.page}>
      {/* 랜딩 페이지에서 사용하던 Header 재사용 */}
      <Header />

      <main className={styles.main}>
        <BestProducts />
        <SellingProducts />
      </main>

      {/* 랜딩 페이지에서 사용하던 Footer 재사용 */}
      <Footer />
    </div>
  );
}

export default ProductPage;
