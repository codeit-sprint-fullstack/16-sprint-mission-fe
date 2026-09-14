import { useProducts } from '../hooks/useProducts';
import './ProductList.scss';
import ProductToolbar from './ProductToolbar';
import ProductItem from './ProductItem';
import Pagination from './Pagination';

const ProductList = () => {
  const {
    products,
    page,
    indicators,
    hasProducts,
    setPage,
    setOrder,
    setKeyword,
    goToPage
  } = useProducts();
  
  return (
    <section className='product-section'>
      <section className='product-container-header'>
        <h2 className='product-container-title'>판매 중인 상품</h2>
        <ProductToolbar 
          onSetPage={setPage}
          onSetOrder={setOrder}
          onSetKeyword={setKeyword}
        />
      </section>
      <section className='product-container'>
        {
          products.map(product => 
            <ProductItem 
              key={product.id}
              image={product.images[0]}
              name={product.name}
              price={product.price}
              favoriteCount={product.favoriteCount}
            />
          )
        }
      </section>
      {
        hasProducts &&
        <Pagination 
          page={page}
          indicators={indicators}
          onGoToPage={goToPage}
        />
      }
    </section>
  );
};

export default ProductList;