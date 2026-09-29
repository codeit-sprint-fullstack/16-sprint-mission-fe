// ======================================================
// src/pages/ProductPage/ProductPage.jsx
// 각 컴포넌트를 조립하는 페이지
// ======================================================
import Header from "../../components/header/header";
import SellingProducts from "../../components/SellingProducts/SellingProducts";
import Footer from "../../components/footer/footer";


import styles from "../ProductPage/ProductPage.module.scss";

// ❌ 이번에는 사용하지 않음
// import BestProducts from "../../components/BestProducts/BestProducts";

function ProductPage() {
  return (
    <div className={styles.page}>
      {/* 랜딩 페이지에서 사용하던 Header 재사용 */}
      <Header />

      <main className={styles.main}>
        {/* ❌ 베스트 상품 목록은 이번 요구사항에서 제외 */}
        {/* <BestProducts /> */}

        {/* ✅ 판매 중인 상품 목록만 보여주기 */}
        <SellingProducts />
      </main>

      {/* 랜딩 페이지에서 사용하던 Footer 재사용 */}
      <Footer />
    </div>
  );
}

export default ProductPage;
