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
    isLoading,
    setPage,
    setOrder,
    setKeyword,
    setIsSearch,
    goToPage
  } = useProducts();
  
  return (
    <section className='product-section'>
      <div className='product-container-header'>
        <h2 className='product-container-title'>판매 중인 상품</h2>
        <ProductToolbar 
          hasProducts={hasProducts}
          isLoading={isLoading}
          onSetPage={setPage}
          onSetOrder={setOrder}
          onSetKeyword={setKeyword}
          onSetIsSearch={setIsSearch}
        />
      </div>
      {
        isLoading
          ? <p style={{height: '674px', textAlign: 'center', lineHeight: '674px'}}>로딩 중</p>
          : hasProducts
            ? <div className='product-container'>
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
              </div>
            : <p style={{height: '674px', textAlign: 'center', lineHeight: '674px'}}>상품이 없습니다</p>
        }
        {
          hasProducts &&
          <Pagination 
            page={page}
            indicators={indicators}
            hasProducts={hasProducts}
            onGoToPage={goToPage}
          />
        }
    </section>
  );
};

export default ProductList;