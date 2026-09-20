import { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import Header from './components/Header';
import Footer from './components/Footer';
import BestProductList from './components/BestProductList';
import ProductList from './components/ProductList';

function App() {
  const { error } = useProducts();
  const [bestError, setBestError] = useState();

  return (
    <>
      <Header />
      {
        error || bestError
        ? <p style={{
            height: 'calc(100dvh - 160px)',
            color: 'var(--error-color)',
            textAlign: 'center',
            lineHeight: 'calc(100dvh - 160px)'
          }}>상품을 불러오지 못했습니다</p>
        : <main>
            <BestProductList onSetBestError={setBestError} />
            <ProductList />
          </main>
      }
      <Footer />
    </>
  );
}

export default App;