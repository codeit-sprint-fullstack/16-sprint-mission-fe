import { Route, Routes, useLocation } from "react-router";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import BoardPage from "./pages/BoardPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivacyPage from "./pages/PrivacyPage";
import FaqPage from "./pages/FaqPage";

const App = () => {
  const url = useLocation();
  const path = url.pathname.slice(1);

  const pageTitle = {
    board: '판다마켓 | 자유게시판',
    items: '판다마켓 | 중고마켓',
    registration: '판다마켓 | 상품 등록',
    login: '판다마켓 | 로그인',
    signup: '판다마켓 | 회원가입',
    privacy: '판다마켓 | 이용약관',
    faq: '판다마켓 | 자주 묻는 질문',
  }

  document.title = pageTitle[path] ?? '판다마켓';

  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='board' element={<BoardPage />} />
        <Route path='items' element={<ItemsPage />} />
        <Route path='items/:id' element={<ItemDetailPage />} />
        <Route path='registration' element={<RegistrationPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/privacy' element={<PrivacyPage />} />
      <Route path='/faq' element={<FaqPage />} />
      <Route path='*' element={<p>404 Not Found</p>} />
    </Routes>
  );
};

export default App;