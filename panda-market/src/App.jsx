import Header from './components/Header';
import BestProductSection from './components/BestProductSection'
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';

// 모든 페이지에서 공통으로 사용하는 헤더, 본문, 푸터 레이아웃
function App() {
  return (
    <div className="app">
      <Header/>
      <main className="pageContent">
        <BestProductSection/>
        <ProductSection/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
