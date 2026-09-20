import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

function useProducts({ page, pageSize, orderBy, keyword }) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProducts({
          page,
          pageSize,
          orderBy,
          keyword,
        });

        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [page, pageSize, orderBy, keyword]);

  return {
    products,
    totalCount,
    isLoading,
    error,
  };
}

export default useProducts;