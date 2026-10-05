// import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
// import BestProductList from '../components/BestProductList';
import ProductList from '../components/ProductList';

const ItemsPage = () => {
  const { error } = useProducts();
  // const [bestError, setBestError] = useState();

  return (
    <>
      {
        error // || bestError
        ? <p style={{
            height: 'calc(100dvh - 160px)',
            color: 'var(--error-color)',
            textAlign: 'center',
            lineHeight: 'calc(100dvh - 160px)'
          }}>상품을 불러오지 못했습니다</p>
        : <main className='items-main'>
            {/* <BestProductList onSetBestError={setBestError} /> */}
            <ProductList />
          </main>
      }
    </>
  );
};

export default ItemsPage;