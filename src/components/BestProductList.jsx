import { useEffect, useState } from 'react';
import { usePageSize } from '../hooks/usePageSize';
import { productApi } from '../services/api';
import './ProductList.scss';
import ProductItem from './ProductItem';

const BestProductList = ({ onSetBestError }) => {
  const [products, setProducts] = useState([]);
  const { bestPageSize } = usePageSize();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    
    const loadProducts = async () => {
      const query = new URLSearchParams();
      query.set('page', 1);
      query.set('pageSize', bestPageSize);
      query.set('orderBy', 'favorite');

      setIsLoading(true);
      onSetBestError(null);

      try {
        const envelop = await productApi.getProducts(query.toString());
        setProducts(envelop.data.list);
      } catch (err) {
        if (err.name === 'CanceledError') return;
        console.error(err);
        onSetBestError(err);
      }finally {
        if (!cancelled){
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
      controller.abort();
    }
  }, [bestPageSize]);

  return (
    <section className='best-product-section'>
      <div className='product-container-header'>
        <h2 className='product-container-title'>베스트 상품</h2>
      </div>
      {
        isLoading
          ? <p style={{height: '372px', textAlign: 'center', lineHeight: '372px'}}>로딩 중</p>
          : <div className='product-container'>
              {
                products.map(product => 
                  <ProductItem 
                    key={product.id}
                    className=' best'
                    image={product.images[0]}
                    name={product.name}
                    price={product.price}
                    favoriteCount={product.favoriteCount}
                  />
                )
              }
            </div>
      }
    </section>
  );
};

export default BestProductList;