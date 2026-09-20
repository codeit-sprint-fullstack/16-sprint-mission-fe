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
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);

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
    const controller = new AbortController();
    let cancelled = false;

    const loadProducts = async () => {
      const query = new URLSearchParams();
      query.set('page', page);
      query.set('pageSize', pageSize);
      query.set('orderBy', order);
      if (keyword) query.set('keyword', keyword);

      setIsLoading(true);
      setError(null);

      if (isSearch) return;

      try {
        const envelop = await productApi.getProducts(query.toString(), controller.signal);
        const { list, totalCount } = envelop.data;
        
        maxPage = Math.ceil(totalCount / pageSize);

        totalCount !== 0 ? setHasProducts(true) : setHasProducts(false);
        setProducts(list);
        setIndicators(createIndicators(page));
      } catch (err) {
        if (err.name === 'CanceledError') return;
        console.error(err);
        setError(err);
      } finally {
        if (!cancelled){
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
      controller.abort();
    }
  }, [pageSize, page, order, keyword, isSearch]);

  return {
    products,
    page,
    indicators,
    hasProducts,
    isLoading,
    error,
    setPage,
    setOrder,
    setKeyword,
    setIsSearch,
    goToPage
  };
};