import { useEffect, useState } from "react";
import api from "../services/api";

const useProducts = ({ page = 1, pageSize = 10, keyword = "" }) => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await api.get("/products", {
          params: {
            page,
            pageSize,
            keyword,
          },
          signal: controller.signal,
        });

        setProducts(data.list ?? []);
        setTotalCount(data.totalCount ?? 0);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError("상품을 불러오지 못했습니다.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    getProducts();

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
};

export default useProducts;
