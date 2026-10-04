import "./styles/market.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<MarketPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
