import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

function useProducts(params) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
    const fetchproducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts(params);
        setProducts(data.list);
        setTotalCount(data.totalCount);
      } finally {
        setIsLoading(false);
      }
    };
    fetchproducts();
  }, [params.page, params.pageSize, params.orderBy, params.keyword]);
  
    return {products, totalCount, isLoading };
}

export default useProducts;