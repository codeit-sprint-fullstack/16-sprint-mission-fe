import { useEffect, useState } from 'react';
import { usePageSize } from '../hooks/usePageSize';
import { productApi } from '../services/api';

let maxPage;

export const useProducts = () => {
  const { pageSize } = usePageSize();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [indicators, setIndicators] = useState([]);
  const [hasProducts, setHasProducts] = useState(true);

  const createIndicators = (targetPage) => {
    const indicatorPool = [];
    const indicatorSize = 5;
    const startPage = Math.floor((targetPage - 1) / indicatorSize) * indicatorSize + 1;
    const indicatorCount = Math.min(indicatorSize, maxPage - startPage + 1);

    for(let i = 0; i < indicatorCount; i++){
      indicatorPool.push(startPage + i);
    }
    
    return indicatorPool;
  };

  const goToPage = (event, targetPage) => {
    event.preventDefault();
    if (targetPage < 1 || targetPage > maxPage) return;
    setPage(targetPage);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const query = new URLSearchParams();
      query.set('page', page);
      query.set('pageSize', pageSize);
      query.set('orderBy', order);
      if (keyword) query.set('keyword', keyword);

      const envelop = await productApi.getProducts(query.toString());
      const { list, totalCount } = envelop.data;
      
      maxPage = Math.ceil(totalCount / pageSize);

      totalCount !== 0 ? setHasProducts(true) : setHasProducts(false);
      setProducts(list);
      setIndicators(createIndicators(page));
    };

    loadProducts();
  }, [pageSize, page, order, keyword]);

  return {
    products,
    page,
    indicators,
    hasProducts,
    setPage,
    setOrder,
    setKeyword,
    goToPage
  };
};