import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <Routes>
      {/* 랜딩 페이지 */}
      <Route path="/" element={<LandingPage />} />

      {/* 중고마켓 페이지 */}
      <Route path="/items" element={<ProductPage />} />

      {/* 상품 등록 페이지 */}
      <Route path="/registration" element={<RegistrationPage />} />

      {/* 상품 상세 페이지 */}
      <Route path="/items/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;
