import { useEffect, useState } from 'react';
import { usePageSize } from '../hooks/usePageSize';
import { productApi } from '../services/api';
import './ProductList.scss';
import ProductItem from './ProductItem';

const BestProductList = () => {
  const [products, setProducts] = useState([]);
  const { bestPageSize } = usePageSize();

  useEffect(() => {
    const loadProducts = async () => {
      const query = new URLSearchParams();
      query.set('page', 1);
      query.set('pageSize', bestPageSize);
      query.set('orderBy', 'favorite');

      const envelop = await productApi.getProducts(query.toString());
      setProducts(envelop.data.list);
    }

    loadProducts();
  }, [bestPageSize]);

  return (
    <section className='best-product-section'>
      <section className='product-container-header'>
        <h2 className='product-container-title'>베스트 상품</h2>
      </section>
      <section className='product-container'>
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
      </section>
    </section>
  );
};

export default BestProductList;