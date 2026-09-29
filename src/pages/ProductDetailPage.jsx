import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

// Sprint 5의 후속 작업에서 페이지 내용과 API를 연결합니다.
function ProductDetailPage() {
  return (
    <div className="market-page">
      <Header />
      <main className="market-main route-placeholder" aria-label="상품 상세" />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
