import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

function useProducts({ page, pageSize, keyword }) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProducts({
          page,
          pageSize,
          keyword,
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        setProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [page, pageSize, keyword]);

  return {
    products,
    totalCount,
    isLoading,
    error,
  };
}

export default useProducts;
